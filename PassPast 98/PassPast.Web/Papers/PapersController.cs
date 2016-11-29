using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Papers
{
    [Route("[controller]")]
    public class PapersController : Controller
    {
        private IPaperManager _papersManager;
        private IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        public PapersController(
            IMapper mapper,
            IPaperManager paperManager,
            UserManager<ApplicationUser> userManager
            )
        {
            _userManager = userManager;
            _mapper = mapper;
            _papersManager = paperManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var papers = (await _papersManager.Get(id))
                .Select( p => _mapper.Map<PaperViewModel>(p));

            return Ok(papers);
        }

        public async Task<IActionResult> Create([FromBody]PaperBindingModel course)
        {
            var newPaper = _mapper.Map<PaperEntity>(course);
            newPaper.CreatedBy = await _userManager.GetUserAsync(User);
            await _papersManager.Create(newPaper);

            var paperToReturn = _mapper.Map<PaperViewModel>(newPaper);

            return Ok(newPaper);
        }
    }
}