using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using PassPast.Data;
using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PassPast.Controllers
{
	[AllowAnonymous]
    public class AccountController : Controller
    {
		PassPastDbContext db;

		public AccountController()
		{
			db = new PassPastDbContext();
		}

		#region Fields and Contructors
		//private ApplicationSignInManager _signInManager;

		//public AccountController()
		//{
		//}

		//public AccountController(ApplicationSignInManager signInManager)
		//{
		//    SignInManager = signInManager;
		//}

		//public ApplicationSignInManager SignInManager
		//{
		//    get
		//    {
		//        return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
		//    }
		//    private set
		//    {
		//        _signInManager = value;
		//    }
		//}

		#endregion

		// GET: Account
		public ActionResult Index()
        {
            return View();
        }	

		

		//[HttpPost]
		[AllowAnonymous]
		//[ValidateAntiForgeryToken]
		public ActionResult ExternalLogin(string provider, string returnUrl)
		{
			// Request a redirect to the external login provider
			return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { returnUrl, provider }));
		}		

		[AllowAnonymous]
		public async Task<ActionResult> ExternalLoginCallback(string returnUrl, string provider)
		{
			var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();

			if (loginInfo == null)
			{
				return RedirectToAction("Login", "Account");
			}

			var providerKey = loginInfo.Login.ProviderKey;

			var checkIfAlreadySignedUp = db.Users.SingleOrDefault(x => x.ProviderId == providerKey);
			if (checkIfAlreadySignedUp != null)
			{
				IdentitySignin(checkIfAlreadySignedUp.Id, checkIfAlreadySignedUp.Name, providerKey);
				return RedirectToAction("Index", "Home");
			}

			//db interactions here pls
			var user = new User { ProviderId = providerKey, Name = loginInfo.ExternalIdentity.Name, Provider = provider };
			db.Users.Add(user);
			db.SaveChanges();

			var fetchUserFromDb = db.Users.SingleOrDefault(x => x.ProviderId == providerKey);

            // when all good make sure to sign in user
            IdentitySignin(fetchUserFromDb.Id, fetchUserFromDb.Name, providerKey);


            return RedirectToAction("Index", "Home");
		}

		public ActionResult Login()
		{
			ViewBag.Title = "Login";
			return View();
		}
		//[HttpPost]
		public ActionResult Logout()
		{
			IdentitySignout();

			return RedirectToAction("Index", "Home");
		}

        #region Signin Logic
        public void IdentitySignin(int userId, string name, string providerKey )
        {
            var claims = new List<Claim>();

            // create *required* claims
            claims.Add(new Claim(ClaimTypes.NameIdentifier, userId.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, name));

            ///creates the user and identity so we can use their stuff later on
            var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
            

            // add to user here!
            AuthenticationManager.SignIn(new AuthenticationProperties()
            {
                AllowRefresh = true,
                IsPersistent = true, //we're just gonna always make this persistant since it's easier fro the user
                ExpiresUtc = DateTime.UtcNow.AddMonths(1) //make something expire in a month
            }, identity);
        }

        public void IdentitySignout()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie,
                                          DefaultAuthenticationTypes.ExternalCookie);
        }
        #endregion

        #region External Auth Helpers
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion



    }
}