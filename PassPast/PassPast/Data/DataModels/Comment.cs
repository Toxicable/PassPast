using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Data.DataModels
{
	public class Comment : BaseDataModel
	{
		public Question Question { get; set; }
		public string Content { get; set; }
		public int VoteCount { get; set; }
		public DateTimeOffset Timestamp { get; set; }
		public User CreatedBy { get; set; }
		public ICollection<User> VotedBy { get; set; }
	}
}