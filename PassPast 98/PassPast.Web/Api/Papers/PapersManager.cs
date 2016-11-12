using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Web.Api.Papers
{
    public class PapersManager : BaseManager
    {
        public async Task<ICollection<PaperViewModel>> GetAll()
        {
            var papers = (await Context.Papers
                .OrderByDescending(c => c.Name)
                .ToListAsync())
                .Select(c => AutoMapper.Map<PaperViewModel>(c))
                .ToList();

            return papers;
        }

        public async Task Create(PaperEntity newPaper)
        {
            Context.Papers.Add(newPaper);

            await Context.SaveChangesAsync();
        }
    }
}