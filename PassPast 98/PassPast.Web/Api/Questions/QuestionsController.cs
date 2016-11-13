using OAuthAPI.WebApi.Api;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PassPast.Web.Api.Questions
{
    public class QuestionsController : BaseApiController
    {
        private QuestionsManger _questionsManager;
        public QuestionsController()
        {
            _questionsManager = new QuestionsManger();
        }

        public async Task<IHttpActionResult> Get(int id)
        {
            var course = await _questionsManager.Get(id);

            return Ok(course);
        }

        public async Task<IHttpActionResult> GetAll(int id)
        {
            var courses = await _questionsManager.GetAll();

            return Ok(courses);
        }

        public async Task<IHttpActionResult> Create(QuestionBindingModel questions)
        {
            foreach(var section in questions.Sections)
            {
                var question = new QuestionEntity {
                    ExamId = questions.ExamId,
                    Type = section.Type
                };
                await _questionsManager.CreateMultiple(question, section.Count);
            }


            return Ok();
        }
    }
}