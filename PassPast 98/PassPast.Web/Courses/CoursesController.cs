using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using PassPast.Web.Api.Courses;
using PassPast.Web.Api.Papers;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<CourseViewModel> Get(int id)
        {
            var course = _mapper.Map<CourseViewModel>(await _courseManager.Get(id));                

            return course;
        }

        [HttpGet]
        public async Task<ICollection<CourseViewModel>> Get()
        {
            var courses = (await _courseManager.GetAll())
                .Select(c => _mapper.Map<CourseViewModel>(c))
                .ToList();

            return courses;
        }

        [HttpGet("{id}/papers")]
        public async Task<ICollection<PaperViewModel>> GetPapers(int id)
        {
            var papers = (await _courseManager.GetPapers(id)).Papers
                .Select(p => _mapper.Map<PaperViewModel>(p))
                .ToList();

            return papers;
        }

        [HttpPost]
        [Authorize]
        public async Task<CourseViewModel> Post([FromBody]CourseBindingModel course)
        {
            var newCourse = _mapper.Map<CourseEntity>(course);

            newCourse.CreatedBy = await _userManager.GetUserAsync(User);

            await _courseManager.Create(newCourse);

            var courseToReturn = _mapper.Map<CourseViewModel>(newCourse);


            return courseToReturn;
        }
    }
}