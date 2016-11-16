using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.Provider;
using Newtonsoft.Json.Linq;
using OAuthAPI.Data.Identity;
using OAuthAPI.WebApi.Api.Identity.Managers;
using OAuthAPI.WebApi.Api.Identity.Models.BindingModels;
using OAuthAPI.WebApi.Api.Identity.Models.ViewModels;
using OAuthAPI.WebApi.Api.Results;
using SendGrid;
using System.Configuration;
using OAuthAPI.WebApi.Api.Identity.Providers;
using PassPast.Web.Api.Identity;

namespace OAuthAPI.WebApi.Api.Identity.Controllers
{
    [Authorize]
    public class AccountController : BaseApiController
    {
        //GET: api/account/IsAuthenticated
        [HttpGet]
        public async Task<IHttpActionResult> IsAuthenticated()
        {
            return Ok("true");
        }

        //GET: api/account/CreateUser
        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> Create(CreateUserBindingModel createUserModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = createUserModel.Username,
                Email = createUserModel.Username,
                AccountCreated = DateTimeOffset.Now,
            };


            IdentityResult addUserResult = await AppUserManager.CreateAsync(user, createUserModel.Password);

            if (!addUserResult.Succeeded)
            {
                return GetIdentityErrorResult(addUserResult);
            }

            //Uri locationHeader = new Uri(Url.Link("GetUser", new { Id = user.Id }));

            //return Created(locationHeader, _mapper.Map<UserViewModel>(user));
            return Ok();
        }

        //GET: api/account/CreateExternal
        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> CreateExternal(string accessToken,string providerString)
        {
            ExternalAuthProviders provider;

            var providerExists = Enum.TryParse(providerString, out provider);
            if (!providerExists)
            {
                ModelState.AddModelError("", "The mandatory 'provider' parameter was missing.");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var externalAuthManager = new ExternalAuthorizationManager();

            if (!await externalAuthManager.VerifyExternalAccessToken(accessToken, provider))
            {
                return BadRequest(ModelState);
            }

            var profile = await externalAuthManager.GetProfile(accessToken, provider);

            var user = new ApplicationUser()
            {
                UserName = profile.email,
                Email = profile.email,
                AccountCreated = DateTimeOffset.Now
            };

            IdentityResult addUserResult = await AppUserManager.CreateAsync(user);

            if (!addUserResult.Succeeded)
            {
                return GetIdentityErrorResult(addUserResult);
            }

            var externalAccount = new ExternalAccount()
            {
                Provider = provider.ToString(),
                ProviderId = profile.id
            };

            await AppUserManager.AddExternalLogin(externalAccount, user);

            return Ok();

        }

        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> LoginExternal(string providerString, string accessToken)
        {
            ExternalAuthProviders provider;

            var providerExists = Enum.TryParse(providerString, out provider);

            if (!providerExists )
            {
                ModelState.AddModelError("", "The mandatory 'provider' parameter was missing.");
                return BadRequest(ModelState);
            }
            var externalAuthManager = new ExternalAuthorizationManager();

            var verifiedAccessToken = await externalAuthManager.VerifyExternalAccessToken(accessToken, provider);
            if (!verifiedAccessToken)
            {
                ModelState.AddModelError("","Invalid Provider or External Access Token");
                return BadRequest(ModelState);
            }

            var profile = await externalAuthManager.GetProfile(accessToken, provider);

            IdentityUser user = await AppUserManager.FindByEmailAsync(profile.email);
            

            if (user == null)
            {
                ModelState.AddModelError("", "External user is not registered");
                return BadRequest(ModelState);
            }

            //generate access token response
            var accessTokenResponse = await GenerateLocalAccessTokenResponse(user.UserName);

            return Ok(accessTokenResponse);

        }

        private async Task<JObject> GenerateLocalAccessTokenResponse(string userName)
        {

            ApplicationUser user = await AppUserManager.FindByEmailAsync(userName);

            if (user == null)
            {
                ModelState.AddModelError("", "The user name or password is incorrect.");
                return null;
            }


            ClaimsIdentity identity = await user.GenerateUserIdentityAsync(AppUserManager, "JWT");

            var tokenExpiration = TimeSpan.FromMinutes(double.Parse(ConfigurationManager.AppSettings["as:AccessTokenExpireTimeSpanMinutes"]));

            var props = new AuthenticationProperties(new Dictionary<string, string>
             {
                 {
                    //TODO: Fix this
                     "as:client_id",  string.Empty
                }
             })
            {
                IssuedUtc = DateTime.UtcNow, ExpiresUtc = DateTime.UtcNow.Add(tokenExpiration)
            };

            var ticket = new AuthenticationTicket(identity, props);


            var jwtFormatter = new CustomJwtFormat(ConfigurationManager.AppSettings["as:Issuer"]);
            var accessToken = jwtFormatter.Protect(ticket);


            JObject tokenResponse = new JObject(
                                        new JProperty("userName", userName),
                                        new JProperty("access_token", accessToken),
                                        new JProperty("token_type", "bearer"),
                                        new JProperty("expires_in", tokenExpiration.TotalSeconds.ToString()),
                                        new JProperty(".issued", ticket.Properties.IssuedUtc.ToString()),
                                        new JProperty(".expires", ticket.Properties.ExpiresUtc.ToString())
        );

            return tokenResponse;
        }

        //GET: api/account/SendConfirmEmail
        [HttpGet]
        public async Task<IHttpActionResult> SendConfirmEmail()
        {
            var userId = User.Identity.GetUserId();
            string code = await AppUserManager.GenerateEmailConfirmationTokenAsync(userId);

           // var callbackUrl = new Uri(Url. Link("ConfirmEmail", new {  userId, code }));

            //we need to do this otherwise the + in the string gets replaced with a space
            var urlCode = Uri.EscapeDataString(code);
            var url = $"{Request.RequestUri.Scheme}://{Request.RequestUri.Authority}/auth/verify?userId={userId}&code={urlCode}";

            var body = $"Please confirm your account by clicking <a href=\"{url}\">here</a>";
            
            await AppUserManager.SendEmailAsync(userId, "Confirm your account", body);
                                                    
            return Ok();
        }

        //GET: api/account/ConfirmEmail
        [HttpGet, AllowAnonymous]
        public async Task<IHttpActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            var escapedCode  = Uri.UnescapeDataString(code);
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(escapedCode))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            IdentityResult result = await AppUserManager.ConfirmEmailAsync(userId, code);

            if (result.Succeeded)
            {
                return Ok();
            }
            
            return GetIdentityErrorResult(result);
            
        }
        //POST: api/account/ChangePassword
        [HttpPost]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.Password);

            if (!result.Succeeded)
            {
                return GetIdentityErrorResult(result);
            }

            return Ok();
        }

        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> SendForgotPassword(SendForgotPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await AppUserManager.FindByNameAsync(model.UserName);
            string code = await AppUserManager.GeneratePasswordResetTokenAsync(user.Id);

            //we need to do this otherwise the + in the string gets replaced with a space
            var urlCode = Uri.EscapeDataString(code);
            var url = $"{Request.RequestUri.Scheme}://{Request.RequestUri.Authority}/auth/reset-password?userId={user.Id}&code={urlCode}";

            await AppUserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + url + "\">here</a>");

            return Ok();
        }

        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> ResetPassword(ResetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await AppUserManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                ModelState.AddModelError("", "Account does not exist");
                return BadRequest(ModelState);
            }

            var result = await AppUserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return GetIdentityErrorResult(result);

        }

    }
}