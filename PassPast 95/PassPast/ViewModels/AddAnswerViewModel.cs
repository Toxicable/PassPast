using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.ViewModels
{
    public class AddAnswerViewModel
    {
		public ICollection<Question> Questions { get; set; }
		public string Name { get; set; }
		public int Votes { get; set; }
		public int Question { get; set; }
	}
}