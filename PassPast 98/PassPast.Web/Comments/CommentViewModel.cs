using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Comments
{
    public class CommentViewModel
    {
        public int id { get; set; }
        public string content { get; set; }
        public int totalVotes { get; set; }
        public int questionId { get; set; }
        public string createdAt { get; set; }
    }
}
