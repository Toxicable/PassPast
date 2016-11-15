using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Web.Api.Identity.Models
{
    public class FacebookDebugTokenBindingModel
    {
        public FacebookDebugTokenData Data { get; set; }
    }

    public class FacebookDebugTokenData
    {
        public string App_Id { get; set; }
        public string Application { get; set; }
        public string Expires_At { get; set; }
        public bool Is_Valid { get; set; }
        public List<string> Scopes { get; set; }
        public string User_Id { get; set; }
    }
}