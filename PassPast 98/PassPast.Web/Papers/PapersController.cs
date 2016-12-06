using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassPast.Data;
using PassPast.Web.Api.Exams;
using System.Collections.Generic;
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
        public async Task<PaperViewModel> Get(int id)
        {
            var papers = _mapper.Map<PaperViewModel>(await _papersManager.Get(id));

            return papers;
        }

        [HttpGet]
        public async Task<ICollection<PaperViewModel>> Get()
        {
            var papers = (await _papersManager.GetAll())
                .Select(p => _mapper.Map<PaperViewModel>(p))
                .ToList();

            return papers;
        }

        [HttpGet("{id}/exams")]
        public async Task<ICollection<ExamViewModel>> GetExams(int id)
        {
            var papers = (await _papersManager.GetExams(id)).Exams
                .Select(p => _mapper.Map<ExamViewModel>(p))
                .ToList();

            return papers;
        }


        public async Task<PaperViewModel> Create([FromBody]PaperBindingModel course)
        {
            var newPaper = _mapper.Map<PaperEntity>(course);
            newPaper.CreatedBy = await _userManager.GetUserAsync(User);
            await _papersManager.Create(newPaper);

            var paperToReturn = _mapper.Map<PaperViewModel>(newPaper);

            return paperToReturn;
        }
    }
}