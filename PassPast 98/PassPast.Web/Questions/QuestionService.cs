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

using PassPast.Web.Infrastructure.Domain;

namespace PassPast.Web.Api.Questions
{
    public interface IQuestionService
    {
        Task CreateFromSections(QuestionBindingModel question, string userId);
    }

    public class QuestionService : IQuestionService
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public QuestionService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
                    ContentOrIncriment = Helpers.ToAlpha(index)
                    
                });                

                return Enumerable.Range(1, bindingModel.Count).Select(currentIncriment => new QuestionEntity
                {
                    SubQuestions = bindingModel.SubQuestions.SelectMany(y => map(y)).ToList(),
                    CreatedAt = DateTimeOffset.Now,
                    CreatedById = userId,
                    ExamId = questions.ExamId,
                    Answers = bindingModel.Type == QuestionType.Mcq && bindingModel.SubQuestions.Count == 0 ? answersFactory().ToList() : null,
                    Type = bindingModel.Type,
                    Incriment = bindingModel.IncrimentationScheme.ToString()
                });
            };

            Func<IList<QuestionEntity>, IList<QuestionEntity>> numberOff = null;
            numberOff = questionst =>
            Enumerable.Range(1, questionst.Count).Select(incriment => {
                var question = questionst[incriment - 1];
                var incrimentationScheme = (IncrimentationScheme)Enum.Parse(typeof(IncrimentationScheme), question.Incriment);
                question.Incriment =
                    incrimentationScheme == IncrimentationScheme.Numbered ? incriment.ToString() :
                    incrimentationScheme == IncrimentationScheme.Alphabetical ? Helpers.ToAlpha(incriment) :
                    Helpers.ToRoman(incriment);
                question.SubQuestions = numberOff(question.SubQuestions.ToList());
                return questionst[incriment - 1];

            }).ToList();  

            var mappedQuestions = questions.Sections.SelectMany( x => map(x).ToList()).ToList();
            var numberedOffQuestions = numberOff(mappedQuestions);

            _context.Questions.AddRange(numberedOffQuestions);
            await _context.SaveChangesAsync();

        }
    }
}