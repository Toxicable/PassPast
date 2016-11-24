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

        public ICollection<ExamSectionBindingModel> Sections { get; set; }
    }

    public class ExamSectionBindingModel
    {
        public int Count { get; set; }
        public QuestionTypeEntity Type { get; set; }
    }
}