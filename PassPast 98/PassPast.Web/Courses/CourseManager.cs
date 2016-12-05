using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PassPast.Web;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Web.Api.Courses
{
    public interface ICourseManager
    {
        Task<CourseEntity> Get(int id);
        Task<ICollection<CourseEntity>> GetAll();
        Task<CourseEntity> GetPapers(int id);
        Task Create(CourseEntity newCourse);
    }

    public class CourseManager: ICourseManager
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public CourseManager(
            ApplicationDbContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CourseEntity> Get(int id)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == id);

            return course;                
        }

        public async Task<CourseEntity> GetPapers(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Papers)
                .SingleOrDefaultAsync(c => c.Id == id);

            return course;
        }

        public async Task<ICollection<CourseEntity>> GetAll()
        {
            var courses = await _context.Courses
                .OrderByDescending(c => c.Name)
                .ToListAsync();

            return courses;
        }

        public async Task Create(CourseEntity newCourse)
        {
            newCourse.CreatedAt = DateTimeOffset.Now;
            _context.Courses.Add(newCourse);

            await _context.SaveChangesAsync();
        }
    }
}