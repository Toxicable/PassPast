using Microsoft.EntityFrameworkCore;
using PassPast.Data;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Answers
{
    public interface IAnswerManager
    {
        Task<AnswerEntity> Create(AnswerEntity answer);
        Task<AnswerEntity> AddVote(VoteEntity vote);
    }

    public class AnswerManager: IAnswerManager
    {
        private readonly ApplicationDbContext _context;

        public AnswerManager(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AnswerEntity> Create(AnswerEntity answer)
        {
            answer.CreatedAt = DateTimeOffset.Now;

            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            return answer;
        }

        public async Task<AnswerEntity> AddVote(VoteEntity vote)
        {
            var existingVote = await _context.Votes
               .Include(v => v.Answer)
               .SingleOrDefaultAsync(v => v.AnswerId == vote.AnswerId && v.CreatedById == vote.CreatedById && !v.Deleted);

            if (existingVote != null)
            {
                //delete and negate the old vote
                existingVote.Deleted = true;
                existingVote.Answer.TotalVotes += existingVote.Value == 1 ? -1 : 1;

                if (vote.Value == existingVote.Value)
                {
                    await _context.SaveChangesAsync();
                    return existingVote.Answer;
                }
            }

            vote.CreatedAt = DateTimeOffset.Now;

            _context.Votes.Add(vote);
            var answer = await _context.Answers.FindAsync(vote.AnswerId);
            answer.TotalVotes += vote.Value;

            await _context.SaveChangesAsync();

            return answer;
        }
    }
}
