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

namespace PassPast.Web.Api.Papers
{
    public interface IPaperManager
    {
        Task<IEnumerable<PaperEntity>> Get(int id);
        Task<IEnumerable<PaperEntity>> GetAll();
        Task Create(PaperEntity newPaper);
    }

    public class PaperManager : IPaperManager
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public PaperManager(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PaperEntity>> Get(int courseId)
        {
            var papers = await _context.Papers
                .Where(p => !p.Deleted)
                .Where(p => p.CourseId == courseId)
                .OrderByDescending(c => c.Name)
                .ToListAsync();

            return papers;
        }

        public async Task<IEnumerable<PaperEntity>> GetAll()
        {
            var papers = await _context.Papers
                .ToListAsync();

            return papers;
        }

        public async Task Create(PaperEntity newPaper)
        {
            newPaper.CreatedAt = DateTimeOffset.Now;
            _context.Papers.Add(newPaper);

            await _context.SaveChangesAsync();
        }
    }
}