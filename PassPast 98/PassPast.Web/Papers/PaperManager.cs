using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Papers
{
    public interface IPaperManager
    {
        Task<PaperEntity> Get(int id);
        Task<PaperEntity> GetExams(int id);       
        Task<IEnumerable<PaperEntity>> GetAll();
        Task Create(PaperEntity newPaper);
    }

    public class PaperManager : IPaperManager
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public PaperManager(
            ApplicationDbContext context, 
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaperEntity> Get(int id)
        {
            var papers = await _context.Papers
                .SingleOrDefaultAsync(c => c.Id == id);

            return papers;
        }

        public async Task<PaperEntity> GetExams(int id)
        {
            var paper = await _context.Papers
                .Include(p => p.Exams)
                .SingleOrDefaultAsync(c => c.Id == id);

            return paper;
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