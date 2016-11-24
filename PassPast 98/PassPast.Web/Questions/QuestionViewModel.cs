using PassPast.Data;
using PassPast.Web.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Web.Api.Questions
{
    public class QuestionViewModel
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int ExamId { get; set; }
        public QuestionTypeEntity Type { get; set; }
    }
}