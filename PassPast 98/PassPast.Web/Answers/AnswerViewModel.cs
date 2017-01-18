using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using PassPast.Web.Users;
using System;

namespace PassPast.Web.Answers
{
    public class AnswerViewModel
    {
        public int id { get; set; }        
        public string contentOrIncriment { get; set; }
        public int totalVotes { get; set; }
        public int questionId { get; set; }
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTimeOffset createdAt { get; set; }

        public UserViewModel createdBy { get; set; }
    }
}
