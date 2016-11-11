using System;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using OAuthAPI.Data;
using AutoMapper;
using OAuthAPI.Data.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using OAuthAPI.WebApi.Api.Identity.Models.ViewModels;
using PassPast.Data;
using PassPast.Web.Api.Courses;

namespace OAuthAPI.WebApi.Api
{
    public class BaseManager : IDisposable
    {
        public ApplicationDbContext Context { get; set; }
        public IMapper AutoMapper { get; set; }

        public BaseManager()
        {
            Context = HttpContext.Current.GetOwinContext().Get<ApplicationDbContext>();

            
            var config = new MapperConfiguration(x =>
            {
                x.CreateMap<CourseEntity, CourseViewModel>();
            });

            AutoMapper = config.CreateMapper();
        }
    


        public void Dispose()
        {
            Context.Dispose();
        }
    }
}