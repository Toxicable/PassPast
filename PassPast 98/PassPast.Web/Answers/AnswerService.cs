using Microsoft.EntityFrameworkCore;
using PassPast.Data;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Answers
{
    public interface IAnswerService
    {
        Task<AnswerEntity> Create(AnswerEntity answer);
        Task<IEnumerable<AnswerEntity>> AddVote(VoteEntity vote, string type);
    }

    public class AnswerService : IAnswerService
    {
        private readonly ApplicationDbContext _context;

        public AnswerService(ApplicationDbContext context)
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

        public async Task<IEnumerable<AnswerEntity>> AddVote(VoteEntity vote, string type)
        {
            vote.CreatedAt = DateTimeOffset.Now;

            var result = new List<AnswerEntity>();

            var answer = await _context.Answers
                .FirstOrDefaultAsync(a => a.Id == vote.AnswerId);

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

                    result.Add(existingVote.Answer);
                    return result;
                }
            }

            if (existingVote == null && type == "mcq")
            {

                var otherAnswer = await _context.Answers
                    .FirstOrDefaultAsync(a => a.QuestionId == answer.QuestionId && a.Votes.Any(q => q.CreatedById == vote.CreatedById && !q.Deleted));

                if (otherAnswer != null)
                {
                    existingVote = await _context.Votes
                   .Include(v => v.Answer)
                   .FirstOrDefaultAsync(v => v.AnswerId == otherAnswer.Id && v.CreatedById == vote.CreatedById && !v.Deleted);

                    //negate the old one
                    existingVote.Deleted = true;
                    existingVote.Answer.TotalVotes += existingVote.Value == 1 ? -1 : 1;

                    //add the other answer
                    result.Add(existingVote.Answer);
                }
            }

            //add the clicked answer
            result.Add(answer);

            _context.Votes.Add(vote);
            answer.TotalVotes += vote.Value;

            await _context.SaveChangesAsync();

            return result;
        }
    }
}
