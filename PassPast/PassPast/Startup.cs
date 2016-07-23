﻿using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartupAttribute(typeof(PassPast.Startup))]

namespace PassPast
{
	public class Startup
	{

		public void Configuration(IAppBuilder app)
		{
            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

			app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

			app.UseCookieAuthentication(new CookieAuthenticationOptions
			{
				AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });

			app.UseFacebookAuthentication(
			   appId: "311510702571628",
			   appSecret: "1c9ea7be9ff9fd3a1986e812967d3df3");
		}
	}
}