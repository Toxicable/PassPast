using System.ComponentModel.DataAnnotations;
using PassPast.Web.Infrastructure.Data;
using PassPast.Web.Infrastructure.Domain;

namespace PassPast.Data.Domain
{
    public class VoteEntity : Entity
    {
        [Required]
        public int VoteTypeId { get; set; }
        public VoteTypeEntity Type { get; set; }

        public int AnswerId { get; set; }
        public AnswerEntity Answer { get; set; }

        public int CommentId { get; set; }
        public CommentEntity Comment { get; set; }
    }
}
