using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Test2.Startup))]
namespace Test2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
