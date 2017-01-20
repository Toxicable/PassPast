using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using PassPast.Web.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Comments
{
    public class CommentViewModel
    {
        public int id { get; set; }
        public string content { get; set; }
        public int questionId { get; set; }
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTimeOffset createdAt { get; set; }

        public bool hasVoted { get; set; }
        public int votesSum { get; set; }

        public UserViewModel createdBy { get; set; }
    }
}
