using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.ViewModels
{
    public class ExamsViewModel
    {
		public ExamsViewModel()
		{
			Exams = new HashSet<Exam>();
		}

		public ICollection<Exam> Exams { get; set; }
        public ICollection<Question> Questions { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }
}