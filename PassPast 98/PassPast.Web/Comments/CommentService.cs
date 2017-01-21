using Microsoft.EntityFrameworkCore;
using PassPast.Data;
using PassPast.Data.Domain;
using PassPast.Web.Users;
using PassPast.Web.Votes;
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
        Task<CommentViewModel> AddVote(VoteEntity vote);
    }
    public class CommentService : ICommentService
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
                    createdAt = c.CreatedAt,
                    content = c.Content,
                    questionId = c.QuestionId,
                    userIdentifier = c.CreatedBy.UserName,
                    votesSum = c.Votes.Where(v => !v.Deleted).Sum(v => v.Value),
                    voteValue = c.Votes
                        .Where(v => !v.Deleted && v.CreatedById == userId)
                        .Select(v => v != null ? (int?)v.Value : null)
                        .FirstOrDefault()
                });

            return comments;
        }

        public async Task<CommentViewModel> Get(int id, string userId = "")
        {
            var comment = await _context.Comments
            .Select(c => new CommentViewModel
            {
                id = c.Id,
                createdAt = c.CreatedAt,
                content = c.Content,
                questionId = c.QuestionId,
                userIdentifier = c.CreatedBy.UserName,
                votesSum = c.Votes.Where(v => !v.Deleted).Sum(v => v.Value),
                voteValue = c.Votes
                    .Where(v => !v.Deleted && v.CreatedById == userId)
                    .Select(v => v != null ? (int?)v.Value : null)
                    .FirstOrDefault()
            })
            .SingleOrDefaultAsync(c => c.id == id);
            return comment;
        }

        public async Task<CommentEntity> Create(CommentEntity comment)
        {
            comment.CreatedAt = DateTimeOffset.Now;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            _context.Users.Find(comment.CreatedById);

            return comment;
        }

        public async Task<CommentViewModel> AddVote(VoteEntity vote)
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
                    return await Get((int)vote.CommentId, vote.CreatedById);
                }
            }

            vote.CreatedAt = DateTimeOffset.Now;

            _context.Votes.Add(vote);
            var comment = await _context.Comments.FindAsync(vote.CommentId);
            //comment.TotalVotes += vote.Value;

            await _context.SaveChangesAsync();
            return await Get(comment.Id, vote.CreatedById);
        }
    }
}
