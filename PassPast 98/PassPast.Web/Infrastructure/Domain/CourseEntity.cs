using PassPast.Web.Infrastructure.Data;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PassPast.Data
{
    public class CourseEntity : TrackedEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        public ICollection<PaperEntity> Papers { get; set; }
    }
}