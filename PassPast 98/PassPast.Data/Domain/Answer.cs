using OAuthAPI.Data;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Data
{
    public class AnswerEntity : Entity
    {
		public string Name { get; set; }
        public ICollection<VoteEntity> Votes { get; set; }
        public int TypeId { get; set; }
        public AnswerTypeEntity Type { get; set; }
        public int QuestionId { get; set; }
        public QuestionEntity Question { get; set; }
    }
}