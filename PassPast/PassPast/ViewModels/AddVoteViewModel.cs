using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.ViewModels
{
    public class AddVoteViewModel
    {
		public int AnswerId { get; set; }
		public int QuestionId { get; set; }
		public string TypeOfVote { get; set; }
	}
}