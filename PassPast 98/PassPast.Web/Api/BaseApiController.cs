using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using OAuthAPI.Data.Identity;
using OAuthAPI.WebApi.Api.Identity.Managers;
using OAuthAPI.WebApi.Api.Identity.Models.ViewModels;

namespace OAuthAPI.WebApi.Api
{
    public class BaseApiController : ApiController
    {
        private readonly ApplicationUserManager _appUserManager = null;
        private readonly ApplicationRoleManager _appRoleManager = null;
        protected readonly IMapper _mapper;

        protected ApplicationUserManager AppUserManager => _appUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();

        protected ApplicationRoleManager AppRoleManager => _appRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();

        public BaseApiController()
        {
            var config = new MapperConfiguration(x =>
            {
                x.CreateMap<ApplicationUser, UserViewModel>();
                x.CreateMap<IdentityRole, RoleViewModel>();
                x.CreateMap<IdentityUserRole, RoleViewModel>();

            });

            _mapper = config.CreateMapper();
        }

        protected IHttpActionResult GetIdentityErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}