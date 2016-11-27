using PassPast.Data.Domain;
using PassPast.Web.Infrastructure.Data;
using PassPast.Web.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class AnswerEntity : TrackedEntity
    {
        [Required]
        public int QuestionId { get; set; }
        public QuestionEntity Question { get; set; }

        public int TotalVotes { get; set; }

        public string ContentOrIncriment { get; set; }

        public ICollection<VoteEntity> Votes { get; set; }
    }
}