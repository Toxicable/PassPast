using Microsoft.EntityFrameworkCore;
using PassPast.Data;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Comments
{
    public interface ICommentManager
    {
        Task<CommentEntity> Create(CommentEntity comment);
        Task<CommentEntity> AddVote(VoteEntity vote);
    }
    public class CommentManager: ICommentManager
    {
        private readonly ApplicationDbContext _context;

        public CommentManager(ApplicationDbContext context)
        {
            _context = context;
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
               .SingleOrDefaultAsync(v => v.CommentId == vote.CommentId && v.CreatedById == vote.CreatedById);

            if (existingVote != null)
            {
                //delete and negate the old vote
                existingVote.Deleted = true;
                existingVote.Comment.TotalVotes += existingVote.Value == 1 ? -1 : 1;

                if (vote.Value == existingVote.Value)
                {
                    return existingVote.Comment;
                }
            }

            vote.CreatedAt = DateTimeOffset.Now;

            _context.Votes.Add(vote);
            var comment = await _context.Comments.FindAsync(vote.CommentId);
            comment.TotalVotes += vote.Value;

            await _context.SaveChangesAsync();
            return comment;
        }
    }
}
