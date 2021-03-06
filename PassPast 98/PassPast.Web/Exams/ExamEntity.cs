﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using PassPast.Web;
using PassPast.Web.Infrastructure.Data;
using PassPast.Web.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace PassPast.Data
{
    public class ExamEntity : TrackedEntity
    {
        [Range(1950, 3000)]
        [Required]
        public int Year { get; set; }

        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        public Semester Semester { get; set; }

        [Required]
        public int PaperId { get; set; }
        public PaperEntity Paper { get; set; }

        public ICollection<QuestionEntity> Questions { get; set; }

	}

    public enum Semester
    {
        S1,
        S2,
        SS
    }
}