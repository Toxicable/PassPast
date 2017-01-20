﻿using AutoMapper;
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
                    incrimentationScheme == IncrimentationScheme.Alphabetical ? ToAlpha(incriment) :
                    ToRoman(incriment);
                question.SubQuestions = numberOff(question.SubQuestions.ToList());
                return questionst[incriment - 1];

            }).ToList();            


            var mappedQuestions = questions.Sections.SelectMany( x => map(x).ToList()).ToList();

            var numberedOffQuestions = numberOff(mappedQuestions);


            _context.Questions.AddRange(numberedOffQuestions);

            await _context.SaveChangesAsync();

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
    }
}