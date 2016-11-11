using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace OAuthAPI.Data.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            ExternalAccounts = new HashSet<ExternalAccount>();
        }

        [Required]
        public DateTimeOffset AccountCreated { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<ExternalAccount> ExternalAccounts { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            userIdentity.AddClaim(new Claim("email_confirmed", EmailConfirmed.ToString()));

            userIdentity.AddClaim(new Claim("first_name", FirstName ?? ""));
            userIdentity.AddClaim(new Claim("last_name", LastName ?? ""));

            return userIdentity;
        }
    }
}