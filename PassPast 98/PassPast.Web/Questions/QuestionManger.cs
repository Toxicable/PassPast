using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PassPast.Web;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using PassPast.Web.Infrastructure.Domain;

namespace PassPast.Web.Api.Questions
{
    public interface IQuestionManger
    {
        Task CreateFromSections(QuestionBindingModel question, string userId);
        Task<ICollection<QuestionEntity>> GetAll(int id);
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

        private string ToRoman(int number)
        {
            if ((number < 0) || (number > 39)) throw new ArgumentOutOfRangeException("insert value betwheen 1 and 39");
            if (number < 1) return string.Empty;
            if (number >= 10) return "x" + ToRoman(number - 10);
            if (number >= 9) return "ix" + ToRoman(number - 9);
            if (number >= 5) return "v" + ToRoman(number - 5);
            if (number >= 4) return "iv" + ToRoman(number - 4);
            if (number >= 1) return "i" + ToRoman(number - 1);
            throw new ArgumentOutOfRangeException("something bad happened");
        }

        private string ToAlpha(int number)
        {
            if ((number < 1) || (number > 26)) throw new ArgumentOutOfRangeException("insert value betwheen 1 and 27");
            return ((char)(number + 96)).ToString();
        }

        public async Task CreateFromSections(QuestionBindingModel questions, string userId)
        {
            Func<QuestionSectionBindingModel, IEnumerable<QuestionEntity>> map = null;

            map = bindingModel =>
            {             
                Func<IEnumerable<AnswerEntity>> answersFactory = () => Enumerable.Range(1, 5).Select(index => new AnswerEntity
                {
                    CreatedById = userId,
                    CreatedAt = DateTimeOffset.Now,
                    ContentOrIncriment = ToAlpha(index)
                    
                });                

                return Enumerable.Range(1, bindingModel.Count).Select(currentIncriment => new QuestionEntity
                {
                    SubQuestions = bindingModel.SubQuestions.SelectMany(y => map(y)).ToList(),
                    CreatedAt = DateTimeOffset.Now,
                    CreatedById = userId,
                    ExamId = questions.ExamId,
                    Answers = bindingModel.Type == QuestionType.Mcq && bindingModel.SubQuestions.Count == 0 ? answersFactory().ToList() : null,
                    Type = bindingModel.Type,
                    Incriment =
                        bindingModel.IncrimentationScheme == IncrimentationScheme.Numbered ? currentIncriment.ToString() :
                        bindingModel.IncrimentationScheme == IncrimentationScheme.Alphabetical ? ToAlpha(currentIncriment) :
                        ToRoman(currentIncriment)
                });
            };

            var mappedQuestions = questions.Sections.SelectMany( x => map(x).ToList()).ToList();
            _context.Questions.AddRange(mappedQuestions);

            await _context.SaveChangesAsync();

        }

        public async Task<ICollection<QuestionEntity>> GetAll(int examId)
        {  
            var exams = await _context.Questions
                .Where(q => q.ExamId == examId)
                .Include(q => q.Answers)
                .Include(a => a.SubQuestions)     
                .ToListAsync();

            return exams;
        }
    }
}