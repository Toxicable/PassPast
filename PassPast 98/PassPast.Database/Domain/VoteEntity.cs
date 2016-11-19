using PassPast.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PassPast.Web.Infrastructure.Data;

namespace PassPast.Data.Domain
{
    public class VoteEntity : Entity
    {
        [Range(-1, 1)]
        public int Value { get; set; }
    }

    public enum VoteType
    {
        Comment,
        Answer
    }
}
