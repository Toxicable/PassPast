using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Comments.Hubs
{
    public class CommentsHub: Hub
    {
        public Task JoinGroup(string examId)
        {
            return Groups.Add(Context.ConnectionId, examId);
        }

        public Task LeaveGroup(string examId)
        {
            return Groups.Remove(Context.ConnectionId, examId);
        }

        [Authorize]
        public void Post( string comment, int questionId)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.hello();
        }

    }
}
