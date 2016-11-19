using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PassPast.Data
{
    public class QuestionEntity : Entity
    {
		// So you don't get a null error, there's always at least an empty hashset
		public QuestionEntity()
		{
			Answers = new HashSet<AnswerEntity>();
			Comments = new HashSet<CommentEntity>();
		}

		public int Number { get; set; }
        public ICollection<AnswerEntity> Answers { get; set; }
        public int ExamId { get; set; }
        public ExamEntity Exam { get; set; }
		public ICollection<CommentEntity> Comments { get; set; }
        public QuestionTypes Type { get; set; }
    }

    public enum QuestionTypes
    {
        Mcq,
        ShortAnswer
    }
}