using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Web.Api.Questions
{
    public class QuestionsManger : BaseManager
    {
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
                Context.Questions.Add(newQuestion);
            }

            await Context.SaveChangesAsync();

        }

        public async Task<QuestionViewModel> Get(int id)
        {
            var exam = (await Context.Questions
                .FirstOrDefaultAsync(c => c.Id == id));

            return AutoMapper.Map<QuestionViewModel>(exam);
        }

        public async Task<ICollection<QuestionViewModel>> GetAll(int examId)
        {
            var exams = (await Context.Questions
                .Where( q => q.ExamId == examId)
                .ToListAsync())
                .Select(c => AutoMapper.Map<QuestionViewModel>(c))
                .ToList();

            return exams;
        }
    }
}