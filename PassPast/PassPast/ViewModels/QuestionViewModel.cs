using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.ViewModels
{
    public class QuestionViewModel
    {
		public QuestionViewModel()
		{
			Questions = new HashSet<Question>();
		}

		public ICollection<Question> Questions{ get; set; }
    }
}