using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Questions
{
    [Route("[controller]")]
    public class QuestionsController : Controller
    {
        private IQuestionManger _questionsManager;
        private readonly IMapper _mapper;
        private UserManager<ApplicationUser> _userManager;

        public QuestionsController(
            IQuestionManger questionManager, 
            UserManager<ApplicationUser> userManager,
            IMapper mapper
            
            )
        {
            _mapper = mapper;
            _userManager = userManager;
            _questionsManager = questionManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var courses = (await _questionsManager.GetAll(id))
                .Select(c => _mapper.Map<QuestionViewModel>(c))
                .ToList();

            return Ok(courses);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]QuestionBindingModel questions)
        {
            var userId = _userManager.GetUserId(User);

            await _questionsManager.CreateFromSections(questions, userId);




            return Ok();
        }
    }
}