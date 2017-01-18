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
        private IPaperService _papersService;
        private IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public PapersController(
            IMapper mapper,
            IPaperService paperService,
            UserManager<ApplicationUser> userManager
            )
        {
            _userManager = userManager;
            _mapper = mapper;
            _papersService = paperService;
        }

        [HttpGet("{id}")]
        public async Task<PaperViewModel> Get(int id)
        {
            var papers = _mapper.Map<PaperViewModel>(await _papersService.Get(id));

            return papers;
        }

        [HttpGet]
        public async Task<ICollection<PaperViewModel>> Get()
        {
            var papers = (await _papersService.GetAll())
                .Select(p => _mapper.Map<PaperViewModel>(p))
                .ToList();

            return papers;
        }

        [HttpGet("{id}/exams")]
        public async Task<ICollection<ExamViewModel>> GetExams(int id)
        {
            var papers = (await _papersService.GetExams(id)).Exams
                .Select(p => _mapper.Map<ExamViewModel>(p))
                .ToList();

            return papers;
        }


        public async Task<PaperViewModel> Create([FromBody]PaperBindingModel course)
        {
            var newPaper = _mapper.Map<PaperEntity>(course);
            newPaper.CreatedBy = await _userManager.GetUserAsync(User);
            await _papersService.Create(newPaper);

            var paperToReturn = _mapper.Map<PaperViewModel>(newPaper);

            return paperToReturn;
        }
    }
}