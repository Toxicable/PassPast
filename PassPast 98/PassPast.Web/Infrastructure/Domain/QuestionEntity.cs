using PassPast.Web.Infrastructure.Data;
using PassPast.Web.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class QuestionEntity : TrackedEntity
    {
		public QuestionEntity()
		{
			Answers = new HashSet<AnswerEntity>();
			Comments = new HashSet<CommentEntity>();
		}

        [Required]
        public int Number { get; set; }

        [Required]
        public int TypeId { get; set; }
        public QuestionTypeEntity Type { get; set; }

        [Required]
        public int ExamId { get; set; }
        public ExamEntity Exam { get; set; }

        public ICollection<AnswerEntity> Answers { get; set; }
		public ICollection<CommentEntity> Comments { get; set; }
        
        public int ParentQuestionId { get; set; }
        public QuestionEntity ParentQuestion { get; set; }
        
        public ICollection<QuestionEntity> SubQuestions { get; set; }
    }
}