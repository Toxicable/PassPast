using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using PassPast.Data;
using PassPast.Web.Answers;
using PassPast.Web.Comments;
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
        public int ExamId { get; set; }
        public string Incriment { get; set; }
        public int? ParentQuestionId { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public QuestionType Type { get; set; }
        public ICollection<QuestionViewModel> SubQuestions { get; set; }
        public ICollection<AnswerViewModel> Answers { get; set; }
        public ICollection<CommentViewModel> Comments { get;set;}
    }
}