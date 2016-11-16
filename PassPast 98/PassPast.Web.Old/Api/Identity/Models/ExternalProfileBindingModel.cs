using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Web.Api.Identity.Models
{
    public class ExternalProfileBindingModel
    {
        public string given_name { get; set; }
        public string family_name { get; set; }
        public string email { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string id { get; set; }
    }
}