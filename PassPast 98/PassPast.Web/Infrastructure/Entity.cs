using PassPast.Web.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PassPast.Web.Infrastructure.Data
{
    public class Entity
    {
        public int Id { get; set; }

        [Required]
        public DateTimeOffset CreatedAt { get; set; }

        public bool Deleted { get; set; }
        public bool Hidden { get; set; }
    }

    public class TrackedEntity: Entity
    {
        [Required]
        public string CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }

        public DateTimeOffset? UpdatedAt { get; set; }
        public string UpdatedById { get; set; }
        public ApplicationUser UpdatedBy { get; set; }
    }
}
