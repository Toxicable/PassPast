using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper.Execution;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using OAuthAPI.WebApi.Api.Identity.Models.BindingModels;
using OAuthAPI.WebApi.Api.Identity.Models.ViewModels;

namespace OAuthAPI.WebApi.Api.Identity.Controllers
{
    [Authorize(Roles="Admin")]
    public class RolesController : BaseApiController
    {
        //PUT: api/roles/Assign/id?roleToAssign=
        [HttpPut]
        public async Task<IHttpActionResult> AssignRole(string id, string roleToAssign)
        {

            var appUser = await AppUserManager.FindByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            var currentRoles = await AppUserManager.GetRolesAsync(appUser.Id);

            var rolesExists = AppRoleManager.Roles.Any(x => x.Name == roleToAssign);

            if (!rolesExists)
            {

                ModelState.AddModelError("", $"Role: '{roleToAssign}' does not exixts in the system");
                return BadRequest(ModelState);
            }

            IdentityResult removeResult = await AppUserManager.RemoveFromRolesAsync(appUser.Id, currentRoles.ToArray());

            if (!removeResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to remove user roles");
                return BadRequest(ModelState);
            }

            IdentityResult addResult = await AppUserManager.AddToRoleAsync(appUser.Id, roleToAssign);

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                return BadRequest(ModelState);
            }

            return Ok();

        }

        [HttpPost]
        public async Task<IHttpActionResult> RemoveFromRole(string userId, string roleId)
        {
            var appUser = await AppUserManager.FindByIdAsync(userId);

            if(appUser == null)
            {
                ModelState.AddModelError("", "User does not exist");
                return BadRequest(ModelState);
            }

            var role = await AppRoleManager.FindByIdAsync(roleId);

            if(role == null)
            {

                ModelState.AddModelError("", "Role does not exist");
                return BadRequest(ModelState);
            }

            var result = await AppUserManager.RemoveFromRoleAsync(userId, role.Name);

            if (!result.Succeeded)
            {
                GetIdentityErrorResult(result);
                return BadRequest(ModelState);
            }

            return Ok();
            
        }

        //PUT: api/roles/
        [HttpGet]
        public async Task<IHttpActionResult> IsInRole( string role)
        {
            if (!User.Identity.IsAuthenticated) return BadRequest("User not authenticated");

            var roleExists = await AppRoleManager.RoleExistsAsync(role);

            if (!roleExists) return BadRequest("Role does not exist");

            var isInRole = await AppUserManager.IsInRoleAsync(User.Identity.GetUserId(), role);

            if (!isInRole) return BadRequest("User not in role");
            

            return Ok("User in role");
        }

        //PUT: api/roles/
        [HttpGet]
        public async Task<IHttpActionResult> GetRole(string Id)
        {
            var role = await AppRoleManager.FindByIdAsync(Id);

            if (role != null)
            {
                return Ok(_mapper.Map<RoleViewModel>(role));
            }

            return NotFound();

        }

        //PUT: api/roles/
        [HttpGet]
        public IHttpActionResult GetAllRoles()
        {
            var roles = this.AppRoleManager.Roles;

            return Ok(roles);
        }

        //PUT: api/roles/
        [HttpPost]
        public async Task<IHttpActionResult> Create(CreateRoleBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = new IdentityRole { Name = model.Name };

            var result = await this.AppRoleManager.CreateAsync(role);

            if (!result.Succeeded)
            {
                return GetIdentityErrorResult(result);
            }

            Uri locationHeader = new Uri(Url.Link("GetRoleById", new { id = role.Id }));

            return Created(locationHeader, _mapper.Map<RoleViewModel>(role));

        }

        //PUT: api/roles/
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteRole(string Id)
        {

            var role = await this.AppRoleManager.FindByIdAsync(Id);

            if (role != null)
            {
                IdentityResult result = await this.AppRoleManager.DeleteAsync(role);

                if (!result.Succeeded)
                {
                    return GetIdentityErrorResult(result);
                }

                return Ok();
            }

            return NotFound();

        }

        [Route("ManageUsersInRole")]
        public async Task<IHttpActionResult> ManageUsersInRole(UsersInRoleBindingModel model)
        {
            var role = await this.AppRoleManager.FindByIdAsync(model.Id);
            
            if (role == null)
            {
                ModelState.AddModelError("", "Role does not exist");
                return BadRequest(ModelState);
            }

            foreach (string user in model.EnrolledUsers)
            {
                var appUser = await this.AppUserManager.FindByIdAsync(user);

                if (appUser == null)
                {
                    ModelState.AddModelError("", $"User: {user} does not exists");
                    continue;
                }

                if (!this.AppUserManager.IsInRole(user, role.Name))
                {
                    IdentityResult result = await this.AppUserManager.AddToRoleAsync(user, role.Name);

                    if (!result.Succeeded)
                    {
                        ModelState.AddModelError("", $"User: {user} could not be added to role");
                    }

                }
            }

            foreach (string user in model.RemovedUsers)
            {
                var appUser = await this.AppUserManager.FindByIdAsync(user);

                if (appUser == null)
                {
                    ModelState.AddModelError("", $"User: {user} does not exists");
                    continue;
                }

                IdentityResult result = await this.AppUserManager.RemoveFromRoleAsync(user, role.Name);

                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", $"User: {user} could not be removed from role");
                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }
    }
}
