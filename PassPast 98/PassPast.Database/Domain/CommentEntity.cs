using PassPast.Web;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using PassPast.Web.Infrastructure.Data;

namespace PassPast.Data
{
	public class CommentEntity : Entity
	{
		public string Content { get; set; }
        public ICollection<VoteEntity> Votes { get; set; }
        public int QuestionId { get; set; }
        public QuestionEntity Question { get; set; }
    }
}