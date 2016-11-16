using System.Linq;
using OAuthAPI.Data.Identity;

namespace OAuthAPI.WebApi.Api.Identity.Managers
{
    public class ClientManager : BaseManager
    {
        public Client FindClient(string id)
        {
            return Context.Clients.SingleOrDefault(x => x.Id == id);
        }
    }

    public class ManagerResult
    {
        public bool Success { get; set; }
    }
}