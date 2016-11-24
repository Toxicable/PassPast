using PassPast.Data;
using PassPast.Web.Infrastructure.Data;
using System.ComponentModel.DataAnnotations;

namespace PassPast.Web.Infrastructure.Domain
{
    public class ShortAnswerEntity : Entity
    {
        [Required]
        public string Content { get; set; }
        [Required]
        public int AnswerId { get; set; }
        public AnswerEntity Answer { get; set; }
    }
}
