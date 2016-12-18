using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Votes
{
    public class VoteBindingModel
    {
        public int Value { get; set; }
        public int? AnswerId { get; set; }
        public int? CommentId { get; set; }
    }
}
