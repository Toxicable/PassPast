using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.IO;
using OAuthApi.AuthServer.Extentions;
using OAuthApi.AuthServer;
using AutoMapper;
using PassPast.Web.Api.Questions;
using PassPast.Web.Api.Exams;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using PassPast.Web.Api.Papers;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using OAuthApi.AuthServer.Controllers;
using System;
using Microsoft.AspNetCore.Mvc;

namespace PassPast.Web
{
    public class Startup
    {

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {   
                // should contain
                //ConnectionStrings:DefaultConnection
                //Authentication:External:Facebook:appToken
                builder.AddUserSecrets();
            }

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options => { options.Filters.Add(new RequireHttpsAttribute()); });

            var env = services.BuildServiceProvider().GetRequiredService<IHostingEnvironment>();

            services.AddSingleton<IConfiguration>(Configuration);
            services.AddTransient<IExternalAuthorizationManager, ExternalAuthorizationManager>();
            services.AddTransient<ICourseManager, CourseManager>();
            services.AddTransient<IExamManager, ExamManager>();
            services.AddTransient<IPaperManager, PaperManager>();
            services.AddTransient<IQuestionManger, QuestionManger>();

            services.AddTransient<IMyService, MyService>();

            var config = new MapperConfiguration(x =>
            {
                x.CreateMap<CourseEntity, CourseViewModel>();
                x.CreateMap<CourseBindingModel, CourseEntity>();

                x.CreateMap<PaperEntity, PaperViewModel>();
                x.CreateMap<PaperBindingModel, PaperEntity>();

                x.CreateMap<ExamEntity, ExamViewModel>();
                x.CreateMap<ExamBindingModel, ExamEntity>();

                x.CreateMap<QuestionEntity, QuestionViewModel>();
                x.CreateMap<QuestionBindingModel, QuestionEntity>();

            });

            services.AddSingleton(sp => config.CreateMapper());

            services.AddMvc();

            services.AddEntityFramework()
                .AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            
            var builder = services.AddOpenIddict<ApplicationDbContext>()
               .AddMvcBinders()
               .EnableTokenEndpoint("/connect/token")
               .AllowPasswordFlow()
               .AllowRefreshTokenFlow()                                   //or should this just be external then check in the controller
               .AllowCustomFlow("urn:ietf:params:oauth:grant-type:external_identity_token");

            if (env.IsDevelopment())
            {
                builder.AddEphemeralSigningKey();
            }
            else
            {
                //add in cert fingerprint
                builder.AddSigningCertificate(Configuration[$"AppSettings:CertFingerPrint"]);
            }

            builder.Configure(options =>
            {
                options.AllowInsecureHttp = env.IsDevelopment();
                options.ApplicationCanDisplayErrors = env.IsDevelopment();

                options.TokenEndpointPath = "/connect/token";

               // options.AccessTokenLifetime =
                //todo sort this out
                //    new TimeSpan(0, int.Parse(Configuration[$"AppSettings:AccessTokenLifetime"]), 0);
            });

            // services.AddOpenIddict<ApplicationDbContext>()
            //     .AddSigningCertificate("7D2A741FE34CC2C7369237A5F2078988E17A6A75");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseDeveloperExceptionPage();            

            app.Map("/api", apiApp =>
            {
                apiApp.UseOAuthValidation();
                apiApp.UseSignalR2();
                apiApp.UseOpenIddict();
                apiApp.UseMvc(routes =>
                {
                    // Matches requests that correspond to an existent controller/action pair
                    routes.MapRoute(
                        name: "default",
                        template: "{controller}/{action}/{id?}");
                });
            });


            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404
                    && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });            

            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");

            app.UseDefaultFiles(options);
            app.UseStaticFiles();

            //SeedDatabase(app);
        }

        private void SeedDatabase(IApplicationBuilder app)
        {
            var options = app
                .ApplicationServices
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>();

            using (var context = new ApplicationDbContext(options))
            {
                //context.Database.EnsureDeleted();
                //context.Database.EnsureCreated();

                
            }
        }
    }
}
