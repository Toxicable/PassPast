using PassPast.Data.Domain;
using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class AnswerEntity : Entity
    {
        [Required]
        public int QuestionId { get; set; }
        public QuestionEntity Question { get; set; }

        public ICollection<VoteEntity> Votes { get; set; }
    }
}