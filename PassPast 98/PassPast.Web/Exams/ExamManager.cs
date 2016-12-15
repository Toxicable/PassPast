using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PassPast.Web;
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
        Task<ExamEntity> Get(int id);
        Task<IEnumerable<QuestionEntity>> GetQuestions(int id);
        Task<IEnumerable<ExamEntity>> GetAll();
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

        public async Task<ExamEntity> Get(int id)
        {
            var exam = await _context.Exams
                .FirstOrDefaultAsync(c => c.Id == id);

            return exam;
        }

        public async Task<IEnumerable<QuestionEntity>> GetQuestions(int id)
        {
            var exams = (await _context.Questions
                .Where(q => q.ExamId == id)
                .Include(q => q.Answers)
                .Include(q => q.Comments)
                .ToListAsync())
                .Where(q => q.ParentQuestionId == null)
                .ToList();

            return  exams;
            
        }

        public async Task<IEnumerable<ExamEntity>> GetAll()
        {
            var exams = await _context.Exams
                .ToListAsync();

            return exams;
        }

        public async Task Create(ExamEntity newExam)
        {
            newExam.CreatedAt = DateTimeOffset.Now;
            _context.Exams.Add(newExam);
            
            await _context.SaveChangesAsync();

        }
    }
}