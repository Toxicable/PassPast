using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using PassPast.Data;
using PassPast.Data.Domain;
using PassPast.Web.Answers;
using PassPast.Web.Votes;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Comments.Hubs
{
    public class ExamHub : Hub
    {
        private IAnswerManager _answerManager { get; set; }
        private IMapper _mapper { get; set; }
        private ICommentManager _commentManager { get; set; }

        public ExamHub(
            IAnswerManager answerManager,
            ICommentManager commentManager,
            IMapper mapper
            )
        {
            _commentManager = commentManager;
            _mapper = mapper;
            _answerManager = answerManager;
        }

        public Task JoinGroup(int examId)
        {
            return Groups.AddAsync(examId.ToString());
        }

        public Task LeaveGroup(int examId)
        {
            return Groups.RemoveAsync(examId.ToString());
        }

        public async Task PostAnswerVote(int groupId, VoteBindingModel vote, string type, string userId)
        {
            var newVote = _mapper.Map<VoteEntity>(vote);
            newVote.CreatedById = userId;

            var editedAnswer = (await _answerManager.AddVote(newVote, type))
                .Select(a => _mapper.Map<AnswerViewModel>(a))
                .ToList();
            await Clients.Group(groupId.ToString()).InvokeAsync("BroadcastAnswerVote", editedAnswer);         
        }

        public async Task PostCommentVote(int groupId, VoteBindingModel vote, string userId)
        {
            var newVote = _mapper.Map<VoteEntity>(vote);
            newVote.CreatedById = userId;

            var editedComment = _mapper.Map<CommentViewModel>(await _commentManager.AddVote(newVote));
            await Clients.Group(groupId.ToString()).InvokeAsync("BroadcastCommentVote", editedComment);
        }

        public async Task PostAnswer(int groupId, AnswerBindingModel answer, string userId)
        {
            var newAnswer = _mapper.Map<AnswerEntity>(answer);
            newAnswer.CreatedById = userId;

            var createdAnswer = _mapper.Map<AnswerViewModel>(await _answerManager.Create(newAnswer));            
            await Clients.Group(groupId.ToString()).InvokeAsync("BroadcastAnswer", createdAnswer);
        }
        
        public async Task PostComment(int groupId, CommentBindingModel comment, string userId)
        {
            var newComment = _mapper.Map<CommentEntity>(comment);
            newComment.CreatedById = userId;

            var createdComment = _mapper.Map<CommentViewModel>(await _commentManager.Create(newComment));
            await Clients.Group(groupId.ToString()).InvokeAsync("BroadcastComment", createdComment);
        }
    }

}
