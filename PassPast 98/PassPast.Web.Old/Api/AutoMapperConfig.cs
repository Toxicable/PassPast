using AutoMapper;
using Microsoft.AspNet.Identity.EntityFramework;
using OAuthAPI.Data.Identity;
using OAuthAPI.WebApi.Api.Identity.Models.ViewModels;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using PassPast.Web.Api.Exams;
using PassPast.Web.Api.Papers;
using PassPast.Web.Api.Questions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Web.Api
{
    public class AutoMapperConfig
    {
        public static IMapper Create()
        {
            var config = new MapperConfiguration(x =>
            {
                x.CreateMap<ApplicationUser, UserViewModel>();
                x.CreateMap<IdentityRole, RoleViewModel>();
                x.CreateMap<IdentityUserRole, RoleViewModel>();

                x.CreateMap<CourseEntity, CourseViewModel>();
                x.CreateMap<CourseBindingModel, CourseEntity>();

                x.CreateMap<PaperEntity, PaperViewModel>();
                x.CreateMap<PaperBindingModel, PaperEntity>();
                
                x.CreateMap<ExamEntity, ExamViewModel>();
                x.CreateMap<ExamBindingModel, ExamEntity>();

                x.CreateMap<QuestionEntity, QuestionViewModel>();
                x.CreateMap<QuestionBindingModel, QuestionEntity>();

            });

            return config.CreateMapper();
        }
    }
}