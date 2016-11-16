using System;

namespace OAuthAPI.Data.Identity
{
    public class RefreshToken
    {
        public string Id { get; set; }
        public ApplicationUser User { get; set; }
        public Client Client { get; set; }
        public DateTimeOffset Issued { get; set; }
        public DateTimeOffset Expires { get; set; }
        public string ProtectedTicket { get; set; }
    }
}
