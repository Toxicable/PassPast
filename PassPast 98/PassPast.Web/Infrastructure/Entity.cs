using PassPast.Web.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PassPast.Web.Infrastructure.Data
{
    public interface IEntity
    {
        int Id { get; set; }

        DateTimeOffset CreatedAt { get; set; }
        string CreatedById { get; set; }
        ApplicationUser CreatedBy { get; set; }

        DateTimeOffset? UpdatedAt { get; set; }
        string UpdatedById { get; set; }
        ApplicationUser UpdatedBy { get; set; }

        bool Deleted { get; set; }
        bool Hidden { get; set; }
    }

    public class Entity : IEntity
    {
        public int Id { get; set; }

        [Required]
        public DateTimeOffset CreatedAt { get; set; }
        [Required]
        public string CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }

        public DateTimeOffset? UpdatedAt { get; set; }
        public string UpdatedById { get; set; }
        public ApplicationUser UpdatedBy { get; set; }

        public bool Deleted { get; set; }
        public bool Hidden { get; set; }
    }
}
