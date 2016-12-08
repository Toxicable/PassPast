using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Answers
{
    public class AnswerViewModel
    {
        public int Id { get; set; }        
        public string ContentOrIncriment { get; set; }
        public int TotalVotes { get; set; }
    }
}
