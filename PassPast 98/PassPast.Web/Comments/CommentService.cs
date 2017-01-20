using Microsoft.EntityFrameworkCore;
using PassPast.Data;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Comments
{
    public interface ICommentService
    {
        IQueryable<CommentViewModel> Get(IEnumerable<int> questionIds, string userId = "");
        Task<CommentEntity> Create(CommentEntity comment);
        Task<CommentEntity> AddVote(VoteEntity vote);
    }
    public class CommentService: ICommentService
    {
        private readonly ApplicationDbContext _context;

        public CommentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IQueryable<CommentViewModel> Get(IEnumerable<int> questionIds, string userId = "")
        {
            var comments = _context.Comments
                .Where(c => questionIds.Contains(c.QuestionId))
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new CommentViewModel
                {
                    id = c.Id,
                    hasVoted = c.Votes.Any(v => !v.Deleted && v.CreatedById == userId),
                    votesSum = c.Votes.Where(v => !v.Deleted).Sum(v => v.Value),
                    createdAt = c.CreatedAt,
                    content = c.Content,
                    questionId = c.QuestionId,
                    createdBy = new Users.UserViewModel
                    {
                        id = c.CreatedBy.Id,
                        userName = c.CreatedBy.UserName
                    }
                });
            return comments;
        }

        public async Task<CommentEntity> Create(CommentEntity comment)
        {
            comment.CreatedAt = DateTimeOffset.Now;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<CommentEntity> AddVote(VoteEntity vote)
        {
            var existingVote = await _context.Votes
               .Include(v => v.Comment)
               .SingleOrDefaultAsync(v => v.CommentId == vote.CommentId && v.CreatedById == vote.CreatedById && !v.Deleted);

            if (existingVote != null)
            {
                //delete and negate the old vote
                existingVote.Deleted = true;
                //existingVote.Comment.TotalVotes += existingVote.Value == 1 ? -1 : 1;

                if (vote.Value == existingVote.Value)
                {
                    await _context.SaveChangesAsync();
                    return existingVote.Comment;
                }
            }

            vote.CreatedAt = DateTimeOffset.Now;

            _context.Votes.Add(vote);
            var comment = await _context.Comments.FindAsync(vote.CommentId);
            //comment.TotalVotes += vote.Value;

            await _context.SaveChangesAsync();
            return comment;
        }
    }
}
