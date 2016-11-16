using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OAuthApi.AuthServer;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Web.Api.Questions
{
    public interface IQuestionManger
    {
        Task CreateMultiple(QuestionEntity question, int copies);
        Task<ICollection<QuestionViewModel>> GetAll(int id);
    }

    public class QuestionManger : IQuestionManger
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public QuestionManger(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateMultiple(QuestionEntity question, int copies)
        {
            for (int i = 1; i < copies + 1; i++)
            {
                var newQuestion = new QuestionEntity
                {
                    Number = i,
                    ExamId = question.ExamId,
                    Type = question.Type
                };
                _context.Questions.Add(newQuestion);
            }

            await _context.SaveChangesAsync();

        }

        public async Task<ICollection<QuestionViewModel>> GetAll(int examId)
        {
            var exams = (await _context.Questions
                .Where( q => q.ExamId == examId)
                .ToListAsync())
                .Select(c => _mapper.Map<QuestionViewModel>(c))
                .ToList();

            return exams;
        }
    }
}