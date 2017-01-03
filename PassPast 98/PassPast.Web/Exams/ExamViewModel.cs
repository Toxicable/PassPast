using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;


namespace PassPast.Web.Api.Exams
{
    public class ExamViewModel
    {
        public int Id { get; set; }
        public int Year { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Semester Semester { get; set; }
        public int PaperId { get; set; }
    }
}