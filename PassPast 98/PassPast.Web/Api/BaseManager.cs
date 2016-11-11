using System;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using OAuthAPI.Data;

namespace OAuthAPI.WebApi.Api
{
    public class BaseManager : IDisposable
    {
        public ApplicationDbContext Context { get; set; }

        public BaseManager()
        {
            Context = HttpContext.Current.GetOwinContext().Get<ApplicationDbContext>();
        }


        public void Dispose()
        {
            Context.Dispose();
        }
    }
}