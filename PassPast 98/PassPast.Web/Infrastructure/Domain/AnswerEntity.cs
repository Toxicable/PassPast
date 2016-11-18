using PassPast.Data.Domain;
using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class AnswerEntity : Entity
    {
        public ICollection<VoteEntity> Votes { get; set; }
        public int QuestionId { get; set; }
        public QuestionEntity Question { get; set; }
    }
}