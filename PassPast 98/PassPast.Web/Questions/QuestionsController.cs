using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Questions
{
    [Route("[controller]")]
    public class QuestionsController : Controller
    {
        private IQuestionManger _questionsManager;
        
        public QuestionsController(IQuestionManger questionManager)
        {
            _questionsManager = questionManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var courses = await _questionsManager.GetAll(id);

            return Ok(courses);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]QuestionBindingModel questions)
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