using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OAuthApi.AuthServer;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Web.Api.Exams
{
    public interface IExamManager
    {
        Task<ExamViewModel> Get(int id);
        Task<ICollection<ExamViewModel>> GetAll();
        Task Create(ExamEntity newExam);
    }

    public class ExamManager: IExamManager
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public ExamManager(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ExamViewModel> Get(int id)
        {
            var exam = (await _context.Exams
                .FirstOrDefaultAsync(c => c.Id == id));

            return _mapper.Map<ExamViewModel>(exam);
        }

        public async Task<ICollection<ExamViewModel>> GetAll()
        {
            var exams = (await _context.Exams
               // .OrderByDescending(c => c.)
                .ToListAsync())
                .Select(c => _mapper.Map<ExamViewModel>(c))
                .ToList();

            return exams;
        }

        public async Task Create(ExamEntity newExam)
        {
            _context.Exams.Add(newExam);
            
            await _context.SaveChangesAsync();

        }
    }
}