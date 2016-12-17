using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Answers
{
    public class AnswerViewModel
    {
        public int id { get; set; }        
        public string contentOrIncriment { get; set; }
        public int totalVotes { get; set; }
        public int questionId { get; set; }
    }
}
