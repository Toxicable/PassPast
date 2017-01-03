using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using PassPast.Web.Infrastructure.Data;
using PassPast.Web.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace PassPast.Data
{
    public class QuestionEntity : TrackedEntity
    {
        public QuestionEntity()
        {
            SubQuestions = new HashSet<QuestionEntity>();
        }
        [Required]
        public string Incriment { get; set; }

        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        public QuestionType Type { get; set; }

        [Required]
        public int ExamId { get; set; }
        public ExamEntity Exam { get; set; }
            
        public int? ParentQuestionId { get; set; }
        public QuestionEntity ParentQuestion { get; set; }

        public ICollection<AnswerEntity> Answers { get; set; }
        public ICollection<CommentEntity> Comments { get; set; }
        public ICollection<QuestionEntity> SubQuestions { get; set; }
    }

    public enum QuestionType
    {
        Mcq,
        Short
    }
}