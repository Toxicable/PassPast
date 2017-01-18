using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Courses
{
    public interface ICourseService
    {
        Task<CourseEntity> Get(int id);
        Task<CourseEntity> GetPapers(int id);
        Task<IEnumerable<CourseEntity>> GetAll();
        Task Create(CourseEntity newCourse);
    }

    public class CourseService: ICourseService
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public CourseService(
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

        public async Task<IEnumerable<CourseEntity>> GetAll()
        {
            var courses = await _context.Courses
                .OrderBy(c => c.Name)
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