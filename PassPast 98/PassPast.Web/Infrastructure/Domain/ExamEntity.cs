using PassPast.Web;
using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class ExamEntity : Entity
    {
        [Range(1950, 10000)]
        [Required]
        public int Year { get; set; }
        [Required]
        public UniversitySemesters Semester { get; set; }
        [Required]
        public int PaperId { get; set; }
        public PaperEntity Paper { get; set; }
        public ICollection<QuestionEntity> Questions { get; set; }

	}

    public enum UniversitySemesters {
        Semester1,
        Semester2,
        SummerSchool
    }

}