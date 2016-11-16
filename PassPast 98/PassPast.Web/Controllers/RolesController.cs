using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace OAuthApi.AuthServer.Controllers
{
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RolesController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task CreateRole(string name)
        {
            await _roleManager.CreateAsync(new IdentityRole(name));

            var user = await _userManager.GetUserAsync(User);
            var t = await _userManager.AddToRoleAsync(user, name);

        }
    }
}
