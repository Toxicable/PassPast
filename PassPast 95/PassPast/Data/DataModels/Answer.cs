using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Data.DataModels
{
    public class Answer : BaseDataModel
    {
		public Answer()
		{
			VotedBy = new HashSet<User>();
		}
		public string Name { get; set; }
        public int Votes { get; set; }
        public Question Question { get; set; }
		public User CreatedBy { get; set; }
		public ICollection<User> VotedBy { get; set; }
    }
}