using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Web.Api.Questions
{
    public class QuestionViewModel
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int ExamId { get; set; }
        public QuestionTypes Type { get; set; }
    }
}