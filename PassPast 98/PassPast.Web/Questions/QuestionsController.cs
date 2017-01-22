using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using PassPast.Web.Answers;
using System.Collections.Generic;
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
        private IAnswerService _answerService;

        public QuestionsController(
            IAnswerService answerService,
            IQuestionService questionService, 
            UserManager<ApplicationUser> userManager,
            IMapper mapper
            
            )
        {
            _answerService = answerService;
            _mapper = mapper;
            _userManager = userManager;
            _questionsService = questionService;
        }

        [HttpGet("{ids}/answers")]
        public async Task<IEnumerable<AnswerViewModel>> Get(string ids)
        {
            var questionIds = ids.Split(',').Select(a => int.Parse(a)).ToList();
            var userId = _userManager.GetUserId(User);

            var answers = await _answerService.GetFromQuestionIds(questionIds, userId);

            return answers;
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