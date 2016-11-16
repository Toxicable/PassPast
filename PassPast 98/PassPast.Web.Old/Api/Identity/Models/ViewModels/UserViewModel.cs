using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace OAuthAPI.WebApi.Api.Identity.Models.ViewModels
{
    public class UserViewModel
    {
        public string Url { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public DateTimeOffset AccountCreated { get; set; }
        public IList<RoleViewModel> Roles { get; set; }
        public IList<Claim> Claims { get; set; }

    }
}