using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Courses
{
    [Route("[controller]")]
    public class CoursesController : Controller
    {
        private ICourseManager _courseManager;
        private IMapper _mapper;

        public CoursesController(IMapper mapper, ICourseManager courseManager)
        {
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
        public async Task<IActionResult> Post([FromBody]CourseBindingModel course)
        {
            var newCourse = _mapper.Map<CourseEntity>(course);

            await _courseManager.Create(newCourse);

            return Ok(newCourse);
        }
    }
}