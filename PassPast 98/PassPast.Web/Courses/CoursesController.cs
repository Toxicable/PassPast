using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Courses
{
    [Route("[controller]")]

    public class CoursesController : Controller
    {
        private readonly ICourseManager _courseManager;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public CoursesController(
            IMapper mapper, 
            ICourseManager courseManager,
             UserManager<ApplicationUser> userManager
             )
        {
            _userManager = userManager;
            _mapper = mapper;
            _courseManager = courseManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await _courseManager.Get(id);

            return Ok(course);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = await _courseManager.GetAll();

            return Ok(courses);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody]CourseBindingModel course)
        {
            var newCourse = _mapper.Map<CourseEntity>(course);

            newCourse.CreatedBy = await _userManager.GetUserAsync(User);

            await _courseManager.Create(newCourse);

            var courseToReturn = _mapper.Map<CourseViewModel>(newCourse);


            return Ok(courseToReturn);
        }
    }
}