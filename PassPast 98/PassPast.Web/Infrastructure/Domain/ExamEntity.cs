using PassPast.Web;
using PassPast.Web.Infrastructure.Data;
using PassPast.Web.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class ExamEntity : TrackedEntity
    {
        [Range(1950, 10000)]
        [Required]
        public int Year { get; set; }

        [Required]
        public int SemesterId { get; set; }
        public SemesterEntity Semester { get; set; }

        [Required]
        public int PaperId { get; set; }
        public PaperEntity Paper { get; set; }

        public ICollection<QuestionEntity> Questions { get; set; }

	}
}