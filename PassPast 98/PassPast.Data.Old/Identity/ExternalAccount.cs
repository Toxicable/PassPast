using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OAuthAPI.Data.Identity
{
    public class ExternalAccount
    {
        public string Id { get; set; }

        [Required]
        public string Provider { get; set; }

        [Required]
        public string ProviderId { get; set; }

        public DateTimeOffset AddedAt { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
