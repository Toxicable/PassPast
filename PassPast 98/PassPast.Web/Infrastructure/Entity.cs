using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.ComponentModel.DataAnnotations;

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
