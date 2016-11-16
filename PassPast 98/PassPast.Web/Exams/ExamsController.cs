using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OAuthApi.AuthServer;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using System.Threading.Tasks;

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
        public async Task<IActionResult> Get(int id)
        {
            var course = await _examsManager.Get(id);

            return Ok(course);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = await _examsManager.GetAll();

            return Ok(courses);
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ExamBindingModel course)
        {

            var newCourse = _mapper.Map<ExamEntity>(course);

            var user = await _userManager.GetUserAsync(User);

            newCourse.CreatedById = user.Id;

            await _examsManager.Create(newCourse);

            var a = _mapper.Map<ExamViewModel>(newCourse);

            return Ok(a);
        }
    }
}