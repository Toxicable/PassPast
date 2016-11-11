using OAuthAPI.Data;
using OAuthAPI.Data.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class ExamEntity : Entity
    {
        [Range(2000, 3000)]
        public int Year { get; set; }
        public UniversitySemesters Semester { get; set; }
        public int PaperId { get; set; }
        public PaperEntity Paper { get; set; }
        public ICollection<QuestionEntity> Questions { get; set; }
        public string CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }

	}
    public enum UniversitySemesters {
        Semester1,
        Semester2,
        SummerSchool
    }

}