using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.ViewModels
{
    public class AddCommentViewModel
    {
        public string Content { get; set; }
        public int VoteCount { get; set; }
        public DateTimeOffset Timestamp { get; set; }
		public int QuestionId { get; set; }
    }
}