using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAuthApi.AuthServer.Hubs
{
    public class EchoHub: Hub
    {
        public void Broadcast(string message)
        {
            Clients.All.broadCast(message);
        }
    }
}
