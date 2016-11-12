using OAuthAPI.WebApi.Api;
using PassPast.Data;
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
        public async Task<CourseViewModel> Get(int id)
        {
            var course = (await Context.Courses
                .FirstOrDefaultAsync(c => c.Id == id));

            return AutoMapper.Map<CourseViewModel>(course);                
        }

        public async Task<ICollection<CourseViewModel>> GetAll()
        {
            var courses = (await Context.Courses
                .OrderByDescending(c => c.Name)
                .ToListAsync())
                .Select(c => AutoMapper.Map<CourseViewModel>(c))
                .ToList();

            return courses;
        }

        public async Task Create(CourseEntity newCourse)
        {
            Context.Courses.Add(newCourse);

            await Context.SaveChangesAsync();
        }
    }
}