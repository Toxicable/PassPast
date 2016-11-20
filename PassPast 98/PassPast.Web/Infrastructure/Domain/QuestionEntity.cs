using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class QuestionEntity : Entity
    {
		public QuestionEntity()
		{
			Answers = new HashSet<AnswerEntity>();
			Comments = new HashSet<CommentEntity>();
		}

        [Required]
        public int Number { get; set; }
        [Required]
        public QuestionTypes Type { get; set; }
        [Required]
        public int ExamId { get; set; }
        public ExamEntity Exam { get; set; }
        public ICollection<AnswerEntity> Answers { get; set; }
		public ICollection<CommentEntity> Comments { get; set; }
    }

    public enum QuestionTypes
    {
        Mcq,
        ShortAnswer
    }
}