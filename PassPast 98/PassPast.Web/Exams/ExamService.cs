using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PassPast.Web;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace PassPast.Web.Api.Exams
{
    public interface IExamService
    {
        Task<ExamEntity> Get(int id);
        Task<IEnumerable<QuestionEntity>> GetQuestions(int id);
        Task<IEnumerable<ExamEntity>> GetAll();
        Task Create(ExamEntity newExam);
    }

    public class ExamService : IExamService
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public ExamService(ApplicationDbContext context, IMapper mapper)
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

        public async Task<IEnumerable<QuestionEntity>> GetQuestions(int examId)
        {
            var questions = (await _context.Questions
                .Where(q => q.ExamId == examId)
                .ToListAsync())
                .Where(q => q.ParentQuestionId == null)
                .ToList();

            return questions;
            
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