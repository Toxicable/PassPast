using PassPast.Data;
using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Infrastructure.Domain
{
    public class McqAnswerEntity : Entity
    {
        [Required]
        public string Incriment { get; set; }

        [Required]
        public int AnswerId { get; set; }
        public AnswerEntity Answer { get; set; }
    }
}
