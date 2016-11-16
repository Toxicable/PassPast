using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Questions
{
    public class QuestionsController : Controller
    {
        private QuestionManger _questionsManager;
        
        public QuestionsController(QuestionManger questionManager)
        {
            _questionsManager = questionManager;
        }

        public async Task<IActionResult> Get(int id)
        {
            var course = await _questionsManager.Get(id);

            return Ok(course);
        }

        public async Task<IActionResult> GetAll(int id)
        {
            var courses = await _questionsManager.GetAll(id);

            return Ok(courses);
        }

        public async Task<IActionResult> Create(QuestionBindingModel questions)
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