using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OAuthAPI.WebApi.Api.Identity.Models.BindingModels
{
    public class CreateExternalBindingModel
    {
        [Required]
        public string AccessToken { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Provider { get; set; }

        [Required]
        public string ProviderId { get; set; }
    }
}