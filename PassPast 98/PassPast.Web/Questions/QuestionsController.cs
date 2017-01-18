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
        private IQuestionService _questionsService;
        private readonly IMapper _mapper;
        private UserManager<ApplicationUser> _userManager;

        public QuestionsController(
            IQuestionService questionService, 
            UserManager<ApplicationUser> userManager,
            IMapper mapper
            
            )
        {
            _mapper = mapper;
            _userManager = userManager;
            _questionsService = questionService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]QuestionBindingModel questions)
        {
            var userId = _userManager.GetUserId(User);

            await _questionsService.CreateFromSections(questions, userId);
            return Ok();
        }
    }
}