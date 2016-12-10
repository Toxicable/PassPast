using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using PassPast.Data;
using PassPast.Data.Domain;
using PassPast.Web.Answers;
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
        private IAnswerManager _answerManager { get; set; }

        public ExamHub(
            IVoteManager voteManager,
            IAnswerManager answerManager
            )
        {
            _answerManager = answerManager;
            _voteManager = voteManager;
        }

        public Task JoinGroup(int examId)
        {
            return Groups.AddAsync(examId.ToString());
        }

        public Task LeaveGroup(int examId)
        {
            return Groups.RemoveAsync(examId.ToString());
        }

        public void PostVote(int value, int id, string type)
        {
            var vote = new VoteEntity
            {
                Value = value
            };
            if(type == "comment")
            {
                vote.CommentId = id;
            }
            if(type == "answer")
            {
                vote.CommentId = id;
            }
        }

        public async Task PostAnswer(int questionId, string content)
        {
            var answer = new AnswerEntity
            {
                ContentOrIncriment = content,
                QuestionId = questionId,
            };

            await _answerManager.Create(answer);
        }
        
        public void PostComment(string content, int questionId)
        {
            var comment = new CommentEntity
            {
                Content = content,
                QuestionId = questionId
            };
        }
    }

}
