using PassPast.Web;
using OAuthAPI.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PassPast.Data.Domain
{
    public class VoteEntity : Entity
    {
        [Range(-1, 1)]
        public int Value { get; set; }
        public DateTimeOffset VotedAt { get; set; }
        public string VotedById { get; set; }
        public ApplicationUser VotedBy { get; set; }
    }

    public enum VoteType
    {
        Comment,
        Answer
    }
}
