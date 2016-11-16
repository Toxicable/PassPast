using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Papers
{
    [Route("[controller]")]
    public class PapersController : Controller
    {
        private IPaperManager _papersManager;
        private IMapper _mapper;

        public PapersController(IMapper mapper, IPaperManager paperManager)
        {
            _mapper = mapper;
            _papersManager = paperManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await _papersManager.Get(id);

            return Ok(course);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = await _papersManager.GetAll();

            return Ok(courses);
        }

        public async Task<IActionResult> Create([FromBody]PaperBindingModel course)
        {
            var newCourse = _mapper.Map<PaperEntity>(course);

            await _papersManager.Create(newCourse);

            return Ok(newCourse);
        }
    }
}