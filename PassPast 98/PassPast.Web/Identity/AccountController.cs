﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using PassPast.Web.Infrastructure.Models;
using PassPast.Web.Infrastructure.Entities;
using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Primitives;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PassPast.Web.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IExternalAuthorizationService _externalAuthService;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext applicationDbContext,
            IExternalAuthorizationService externalAuthService
            )
        {
            _externalAuthService = externalAuthService;
            _userManager = userManager;
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost("RegisterExternal")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterExternal([FromBody]RegisterExternalBindingModel model)
        {
            if (ModelState.IsValid)
            {
                var isValid = await _externalAuthService.VerifyExternalAccessToken(model.AccessToken, model.Provider);

                if (!isValid)
                {
                    return BadRequest(new OpenIdConnectResponse
                    {
                        Error = OpenIdConnectConstants.Errors.InvalidRequest,
                        ErrorDescription = "Invalid access_token, this usually happens when it is expired"
                    });
                }

                var profile = await _externalAuthService.GetProfile(model.AccessToken, model.Provider);

                var user = new ApplicationUser {
                    UserName = profile.email,
                    Email = profile.email,
                    FirstName = profile.first_name,
                    LastName = profile.last_name,
                    CreatedAt = DateTimeOffset.Now
                };
                var externalAccount = new ExternalAccount() {
                    Id = Guid.NewGuid().ToString(),
                    AddedAt = DateTimeOffset.Now,
                    Provider = model.Provider,
                    ProviderUserId = profile.id
                };
                user.ExternalAccounts.Add(externalAccount);

                var result = await _userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    return Ok();
                }
                AddErrors(result);
            }

            // If we got this far, something failed.
            return BadRequest(ModelState);
        }

        #region Helpers      

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        #endregion
    }
}
