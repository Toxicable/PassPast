using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassPast.Web;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Collections;
using System.Collections.Generic;
using PassPast.Web.Api.Questions;
using System.Linq;

namespace PassPast.Web.Api.Exams
{
    [Route("[controller]")]
    public class ExamsController : Controller
    {
        private IExamManager _examsManager;
        private IMapper _mapper;
        private UserManager<ApplicationUser> _userManager;

        public ExamsController(IMapper mapper, IExamManager examManger, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _examsManager = examManger;
        }

        [HttpGet("{id}")]
        public async Task<ExamViewModel> Get(int id)
        {
            var course = _mapper.Map<ExamViewModel>(await _examsManager.Get(id));

            return course;
        }

        [HttpGet]
        public async Task<ICollection<ExamViewModel>> Get()
        {
            var courses = (await _examsManager.GetAll())
                .Select(e => _mapper.Map<ExamViewModel>(e))
                .ToList();

            return courses;
        }

        [HttpGet("{id}/questions")]
        public async Task<ICollection<QuestionViewModel>> GetQuestions(int id)
        {
            var questions = (await _examsManager.GetQuestions(id))
                .Select(q => _mapper.Map<QuestionViewModel>(q))
                .ToList();

            return questions;
        }

        [HttpPost]
        [Authorize]
        public async Task<ExamViewModel> Create([FromBody]ExamBindingModel course)
        {

            var newCourse = _mapper.Map<ExamEntity>(course);

            var userId = _userManager.GetUserId(User);

            newCourse.CreatedById = userId;

            await _examsManager.Create(newCourse);

            var examToReturn = _mapper.Map<ExamViewModel>(newCourse);

            return examToReturn;
        }
    }
}