
using AutoMapper;
using Microsoft.AspNetCore.Identity;
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
        private IAnswerService _answerService { get; set; }
        private IMapper _mapper { get; set; }
        private ICommentService _commentService { get; set; }
        private UserManager<ApplicationUser> _userManager { get; set; }

        public ExamHub(
            IAnswerService answerService,
            ICommentService commentService,
            IMapper mapper,
            UserManager<ApplicationUser> userManager
            )
        {
            _userManager = userManager;
            _commentService = commentService;
            _mapper = mapper;
            _answerService = answerService;
        }

        public Task JoinGroup(int examId)
        {
            return Groups.AddAsync(examId.ToString());
        }

        public Task LeaveGroup(int examId)
        {
            return Groups.RemoveAsync(examId.ToString());
        }

        public async Task PostAnswerVote(int groupId, VoteBindingModel vote, string type)
        {
            var newVote = _mapper.Map<VoteEntity>(vote);
            newVote.CreatedById = _userManager.GetUserId(Context.User);

            var editedAnswer = await _answerService.AddVote(newVote, type);

            await Clients.Group(groupId.ToString()).InvokeAsync("BroadcastAnswerVote", editedAnswer);         
        }

        public async Task PostCommentVote(int groupId, VoteBindingModel vote)
        {
            var newVote = _mapper.Map<VoteEntity>(vote);
            newVote.CreatedById = _userManager.GetUserId(Context.User);

            var editedComment = await _commentService.AddVote(newVote);
            await Clients.Group(groupId.ToString()).InvokeAsync("BroadcastCommentVote", editedComment);
        }

        public async Task PostAnswer(int groupId, AnswerBindingModel answer)
        {
            var newAnswer = _mapper.Map<AnswerEntity>(answer);
            newAnswer.CreatedById = _userManager.GetUserId(Context.User);

            var createdAnswer = _mapper.Map<AnswerViewModel>(await _answerService.Create(newAnswer));            
            await Clients.Group(groupId.ToString()).InvokeAsync("BroadcastAnswer", createdAnswer);
        }
        
        public async Task PostComment(int groupId, CommentBindingModel comment)
        {
            var newComment = _mapper.Map<CommentEntity>(comment);
            newComment.CreatedById = _userManager.GetUserId(Context.User);

            var createdComment = _mapper.Map<CommentViewModel>(await _commentService.Create(newComment));
            await Clients.Group(groupId.ToString()).InvokeAsync("BroadcastComment", createdComment);
        }
    }

}
