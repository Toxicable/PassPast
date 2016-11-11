using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OAuthAPI.Data.Identity
{
    public class Client
    {
        public string Id { get; set; }
        [Required]
        public string Secrect { get; set; }
        [Required]
        public string Name { get; set; }
        public ApplicationType Type { get; set; }
        public bool Active { get; set; }
        public int RefreshTokenLifeTime { get; set; }
        public string AllowedOrigin { get; set; }

        public ICollection<RefreshToken> RefreshTokens { get; set; }
    }

    public enum ApplicationType
    {
        JavaScript,
        Native
    }
}
