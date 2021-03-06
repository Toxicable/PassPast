﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.IO;
using AutoMapper;
using PassPast.Web.Api.Questions;
using PassPast.Web.Api.Exams;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using PassPast.Web.Api.Papers;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.ApplicationInsights;
using System.Linq;
using PassPast.Web.Answers;
using AspNet.Security.OAuth.Validation;
using System.Threading.Tasks;
using PassPast.Web.Votes;
using PassPast.Web.Comments.Hubs;
using PassPast.Web.Comments;
using PassPast.Data.Domain;
using PassPast.Web.Users;

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
                builder.AddUserSecrets("PassPast.Web");
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var env = services.BuildServiceProvider().GetRequiredService<IHostingEnvironment>();

            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddSingleton<IConfiguration>(Configuration);
            services.AddTransient<IExternalAuthorizationService, ExternalAuthorizationService>();
            services.AddTransient<ICourseService, CourseService>();
            services.AddTransient<IExamService, ExamService>();
            services.AddTransient<IPaperService, PaperService>();
            services.AddTransient<IQuestionService, QuestionService>();
            services.AddTransient<IAnswerService, AnswerService>();
            services.AddTransient<ICommentService, CommentService>();

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

                x.CreateMap<AnswerEntity, AnswerViewModel>();
                x.CreateMap<AnswerBindingModel, AnswerEntity>();

                x.CreateMap<CommentEntity, CommentViewModel>();
                x.CreateMap<CommentBindingModel, CommentEntity>();

                x.CreateMap<VoteBindingModel, VoteEntity>();

                x.CreateMap<ApplicationUser, UserViewModel>();
            });

            services.AddSingleton(sp => config.CreateMapper());

            services.AddMvc();

            services.AddEntityFramework()
                .AddDbContext<ApplicationDbContext>(options => {
                    options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"]);
                    options.UseOpenIddict();
                    });

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            var builder = services.AddOpenIddict()
                .AddEntityFrameworkCoreStores<ApplicationDbContext>()
               .AddMvcBinders()
               .EnableTokenEndpoint("/connect/token")
               .AllowPasswordFlow()
               .AllowRefreshTokenFlow()
               .AllowCustomFlow("urn:ietf:params:oauth:grant-type:external_identity_token")
               .SetAccessTokenLifetime(TimeSpan.FromMinutes(double.Parse(Configuration["Authentication:TokenLifespan"])));

            if (env.IsDevelopment())
            {
                builder.AddEphemeralSigningKey();
            }
            else
            {
                services.AddMvc(options => { options.Filters.Add(new RequireHttpsAttribute()); });
                builder.AddSigningCertificate(Configuration["WEBSITE_LOAD_CERTIFICATES"]);
            }

            builder.Configure(options =>
            {
                options.AllowInsecureHttp = env.IsDevelopment();
            });

            services.AddSignalR();

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseApplicationInsightsRequestTelemetry();
            app.ApplicationServices.GetService<TelemetryClient>().Context.Properties["Environment"] = env.EnvironmentName;

            if (!env.IsDevelopment())
            {
                var redirectOptions = new RewriteOptions()
                    .AddRedirectToHttps();
                app.UseRewriter(redirectOptions);
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseApplicationInsightsExceptionTelemetry();

            app.Map("/api", apiApp =>
            {
                if (env.IsDevelopment())
                {
                    apiApp.UseCors(builder =>
                       builder.WithOrigins("http://localhost:4200")
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                       );
                }

                apiApp.UseOAuthValidation(options =>
                {
                    options.Events = new OAuthValidationEvents
                    {
                        // Note: for SignalR connections, the default Authorization header does not work,
                        // because the WebSockets JS API doesn't allow setting custom parameters.
                        // To work around this limitation, the access token is retrieved from the query string.
                        OnRetrieveToken = context =>
                        {
                            context.Token = context.Request.Query["access_token"];

                            return Task.FromResult(0);
                        }
                    };
                });

                apiApp.UseSignalR(router =>
                {
                    router.MapHub<ExamHub>("/exam-hub");
                });
                
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

            app.UseDefaultFiles();
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
                context.Database.EnsureCreated();

                var user = context.Users.FirstOrDefault(x => x.UserName == "fabian.wiles@gmail.com");
                if (user == null) return;

                //TODO: add me to the admin role


                context.SaveChanges();

            }
        }
    }
}
