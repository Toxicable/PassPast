using PassPast.Data;
using PassPast.Web.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Web.Api.Questions
{
    public class QuestionBindingModel
    {
        public int ExamId { get; set; }

        public ICollection<QuestionSectionBindingModel> Sections { get; set; }
    }

    public class QuestionSectionBindingModel
    {
        public int Count { get; set; }
        public QuestionType Type { get; set; }
        public IncrimentationScheme IncrimentationScheme { get; set; }
        public ICollection<QuestionSectionBindingModel> SubQuestions { get; set; }
    }
}