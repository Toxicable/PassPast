using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Data.DataModels
{
    public class Question : BaseDataModel
    {
		// So you don't get a null error, there's always at least an empty hashset
		public Question()
		{
			Answers = new HashSet<Answer>();
			Comments = new HashSet<Comment>();
		}

		public int Number { get; set; }
		public int TotalVotes { get; set; }
        public ICollection<Answer> Answers { get; set; }
        public Exam Exam { get; set; }
		public ICollection<Comment> Comments { get; set; }
    }
}