using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Web.Api.Exams
{
    public class ExamsManager : BaseManager
    {
        public async Task<ExamViewModel> Get(int id)
        {
            var exam = (await Context.Exams
                .FirstOrDefaultAsync(c => c.Id == id));

            return AutoMapper.Map<ExamViewModel>(exam);
        }

        public async Task<ICollection<ExamViewModel>> GetAll()
        {
            var exams = (await Context.Exams
               // .OrderByDescending(c => c.)
                .ToListAsync())
                .Select(c => AutoMapper.Map<ExamViewModel>(c))
                .ToList();

            return exams;
        }

        public async Task Create(ExamEntity newExam)
        {
            Context.Exams.Add(newExam);

            try
            {
                await Context.SaveChangesAsync();

            }
            catch(Exception e)
            {

            }
        }
    }
}