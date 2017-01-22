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
        public int questionId { get; set; }

        public int? voteValue { get; set; }
        public int votesSum { get; set; }
        public string userIdentifier { get; set; }

        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTimeOffset createdAt { get; set; }
    }
}
