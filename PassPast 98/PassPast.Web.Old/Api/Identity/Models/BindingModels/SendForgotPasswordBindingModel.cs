using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OAuthAPI.WebApi.Api.Identity.Models.BindingModels
{
    public class SendForgotPasswordBindingModel
    {
        [Required]
        public string UserName { get; set; }
    }
}