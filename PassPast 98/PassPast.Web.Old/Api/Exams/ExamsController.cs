using Microsoft.AspNet.Identity;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PassPast.Web.Api.Exams
{

    public class ExamsController : BaseApiController
    {
        private ExamsManager _examsManager;
        public ExamsController()
        {
            _examsManager = new ExamsManager();
        }

        public async Task<IHttpActionResult> Get(int id)
        {
            var course = await _examsManager.Get(id);

            return Ok(course);
        }

        public async Task<IHttpActionResult> GetAll()
        {
            var courses = await _examsManager.GetAll();

            return Ok(courses);
        }

        [Authorize]
        public async Task<IHttpActionResult> Create(ExamBindingModel course)
        {

            var newCourse = _mapper.Map<ExamEntity>(course);

            newCourse.CreatedById = User.Identity.GetUserId(); ;

            await _examsManager.Create(newCourse);

            return Ok(newCourse);
        }
    }
}