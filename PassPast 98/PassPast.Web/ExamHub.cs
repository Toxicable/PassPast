using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using PassPast.Web.Votes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Comments.Hubs
{
    public class ExamHub : Hub
    {
        private IVoteManager _voteManager { get; set; }

        //public ExamHub()
        //{
        //    //_voteManager = new VoteManager();
        //}

        public void JoinGroup(int examId)
        {
            //return Groups.AddAsync(examId.ToString());
        }

        public void LeaveGroup(string examId)
        {
            //return Groups.RemoveAsync(examId);
        }

        public void Echo(string message)
        {
        }

        public void PostVote(int value, int id, string type)
        {

        }

        [Authorize]
        public void Post(string comment, int questionId)
        {

        }
    }

}
