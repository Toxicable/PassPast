using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PassPast.Data
{
    public class PaperEntity : Entity
    {
        public string Name { get; set; }
        public int CourseId { get; set; }
        public CourseEntity Course { get; set; }
        public ICollection<ExamEntity> Exams { get; set; }
	}
}