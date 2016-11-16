using OAuthAPI.Data;
using OAuthAPI.Data.Identity;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
	public class CommentEntity : Entity
	{
		public string Content { get; set; }
        public ICollection<VoteEntity> Votes { get; set; }
		public DateTimeOffset PostedAt { get; set; }
        public int QuestionId { get; set; }
        public QuestionEntity Question { get; set; }
        public string CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }
    }
}