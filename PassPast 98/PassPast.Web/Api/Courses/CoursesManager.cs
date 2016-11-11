using OAuthAPI.WebApi.Api;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Web.Api.Courses
{
    public class CoursesManager : BaseManager
    {
        public async Task<ICollection<CourseViewModel>> GetAll()
        {
            var courses = (await Context.Courses
                .OrderByDescending(c => c.Name)
                .ToListAsync())
                .Select(c => AutoMapper.Map<CourseViewModel>(c))
                .ToList();

            return courses;
        }
    }
}