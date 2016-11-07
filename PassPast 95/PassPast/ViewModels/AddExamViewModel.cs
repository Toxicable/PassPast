using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.ViewModels
{
    public class AddExamViewModel
    {
		public ICollection<Paper> Paper { get; set; }
		public int Year { get; set; }
		public string Semester { get; set; }
		public string TypeOfExam { get; set; }
		public int NumberOfQuestions { get; set; }
		public string MCQFormatOfAnswers { get; set; }
		public int MCQNumberOfAnswers { get; set; }
		public string CourseCode { get; set; }
		public string PaperName { get; set; }
	}
}