using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace PassPast.Data
{
    public class PaperEntity : TrackedEntity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int CourseId { get; set; }
        public CourseEntity Course { get; set; }

        public ICollection<ExamEntity> Exams { get; set; }
	}
}