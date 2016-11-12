using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PassPast.Web.Api.Courses
{
    public class CoursesController : BaseApiController
    {
        private CoursesManager _coursesManager;
        public CoursesController()
        {
            _coursesManager = new CoursesManager();
        }

        public async Task<IHttpActionResult> GetAll()
        {
            var courses =  await _coursesManager.GetAll();

            return Ok(courses);
        }

        public async Task<IHttpActionResult> Create(CourseBindingModel course)
        {
            var newCourse = _mapper.Map<CourseEntity>(course);

            await _coursesManager.Create(newCourse);

            return Ok(newCourse);
        }
    }
}