using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Web.Api.Exams
{
    public class ExamBindingModel
    {
        public int Year { get; set; }
        public UniversitySemesters Semester { get; set; }
        public int PaperId { get; set; } 
    }
}