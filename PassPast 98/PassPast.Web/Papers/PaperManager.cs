using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OAuthApi.AuthServer;
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
        Task<PaperViewModel> Get(int id);
        Task<ICollection<PaperViewModel>> GetAll();
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

        public async Task<PaperViewModel> Get(int id)
        {
            var paper = (await _context.Papers
                .FirstOrDefaultAsync(c => c.Id == id));

            return _mapper.Map<PaperViewModel>(paper);
        }

        public async Task<ICollection<PaperViewModel>> GetAll()
        {
            var papers = (await _context.Papers
                .OrderByDescending(c => c.Name)
                .ToListAsync())
                .Select(c => _mapper.Map<PaperViewModel>(c))
                .ToList();

            return papers;
        }

        public async Task Create(PaperEntity newPaper)
        {
            _context.Papers.Add(newPaper);

            await _context.SaveChangesAsync();
        }
    }
}