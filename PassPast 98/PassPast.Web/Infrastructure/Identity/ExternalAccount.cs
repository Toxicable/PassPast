using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OAuthApi.AuthServer.Infrastructure.Entities
{
    public class ExternalAccount
    {
        public string Id { get; set; }

        [Required]
        public ExternalAuthProviders Provider { get; set; }

        [Required]
        public string ProviderUserId { get; set; }

        public DateTimeOffset AddedAt { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
