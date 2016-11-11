namespace OAuthAPI.WebApi.Migrations
{
    using Data.Identity;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<OAuthAPI.WebApi.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            var user = new ApplicationUser()
            {
                UserName = "fabianwiles@live.com",
                Email = "fabianwiles@live.com",
                EmailConfirmed = true,
                AccountCreated = DateTime.Now
            };

            var t = manager.Create(user, "123456");

            if (!roleManager.Roles.Any())
            {
                roleManager.Create(new IdentityRole { Name = "SuperAdmin" });
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByName("fabianwiles@live.com");

            manager.AddToRoles(adminUser.Id, "SuperAdmin", "Admin");

            if (!context.Clients.Any())
            {
                context.Clients.Add(new Client
                {
                    Active = true,
                    AllowedOrigin = "http://localhost:44310/",
                    Id = "AngularApp",
                    Name = "Our Angular Application front end",
                    RefreshTokenLifeTime = 10,
                    Secrect = Convert.ToBase64String(Guid.NewGuid().ToByteArray()),
                    Type = ApplicationType.JavaScript
                });

                context.SaveChanges();
            }

        }
    }
}
