using OAuthAPI.WebApi.Api;
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
    }
}