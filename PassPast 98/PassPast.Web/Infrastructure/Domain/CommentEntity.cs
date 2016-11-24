using PassPast.Web;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using PassPast.Web.Infrastructure.Data;

namespace PassPast.Data
{
	public class CommentEntity : TrackedEntity
	{
        [Required]
        public string Content { get; set; }

        [Required]
        public int QuestionId { get; set; }
        public QuestionEntity Question { get; set; }

        public ICollection<VoteEntity> Votes { get; set; }
    }
}