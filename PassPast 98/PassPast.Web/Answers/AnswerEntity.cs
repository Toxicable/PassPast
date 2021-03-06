﻿using PassPast.Data.Domain;
using PassPast.Web.Infrastructure.Data;
using PassPast.Web.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace PassPast.Data
{
    public class AnswerEntity : TrackedEntity
    {
        public AnswerEntity()
        {
            Votes = new HashSet<VoteEntity>();
        }
        [Required]
        public int QuestionId { get; set; }
        public QuestionEntity Question { get; set; }

        public string ContentOrIncriment { get; set; }

        public ICollection<VoteEntity> Votes { get; set; }
    }
}