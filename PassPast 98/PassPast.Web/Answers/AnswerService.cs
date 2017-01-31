using AutoMapper;
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
        Task<AnswerViewModel> Create(AnswerEntity answer);
        Task<IEnumerable<AnswerViewModel>> AddVote(VoteEntity vote, string type);
        Task<IEnumerable<AnswerViewModel>> Get(List<int> questionIds, string userId);
        Task<IEnumerable<AnswerViewModel>> GetFromQuestionIds(List<int> questionIds, string userId);
    }

    public static class AnswerServiceExtentions
    {
        public static IQueryable<AnswerViewModel> Map(this IQueryable<AnswerEntity> src, string userId)
        {
            return src.Select(a => new AnswerViewModel
            {
                createdAt = a.CreatedAt,
                id = a.Id,
                questionId = a.QuestionId,
                userIdentifier = a.CreatedBy.UserName,
                contentOrIncriment = a.ContentOrIncriment,
                votesSum = a.Votes.Where(v => !v.Deleted).Sum(v => v.Value),
                voteValue = a.Votes
                       .Where(v => !v.Deleted && v.CreatedById == userId)
                       .Select(v => v != null ? (int?)v.Value : null)
                       .FirstOrDefault(),
            });
        }
    }

    public class AnswerService : IAnswerService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AnswerService(
            ApplicationDbContext context,
            IMapper mapper
            )
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<AnswerViewModel> Create(AnswerEntity answer)
        {
            answer.CreatedAt = DateTimeOffset.Now;

            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            var mapped = (await Get(new List<int> { answer.Id }, answer.CreatedById)).First();

            return mapped;
        }

        public async Task<IEnumerable<AnswerViewModel>> GetFromQuestionIds(List<int> questionIds, string userId)
        {
            var answers = await _context.Answers
                .Where(a => questionIds.Contains(a.QuestionId))
                .Map(userId)
                .ToListAsync();

            return answers;
        }

        public async Task<IEnumerable<AnswerViewModel>> Get(List<int> ids, string userId)
        {
            var answers = await _context.Answers
                .Where(a => ids.Contains(a.Id))
                .Map(userId)
                .ToListAsync();

            return answers;
        }

        public async Task<IEnumerable<AnswerViewModel>> AddVote(VoteEntity vote, string type)
        {
            vote.CreatedAt = DateTimeOffset.Now;

            var result = new List<int>();

            var answer = await _context.Answers
                .FirstOrDefaultAsync(a => a.Id == vote.AnswerId);

            var existingVote = await _context.Votes
                .Include(v => v.Answer)
                .SingleOrDefaultAsync(v => v.AnswerId == vote.AnswerId && v.CreatedById == vote.CreatedById && !v.Deleted);


            if (existingVote != null)
            {
                //delete and negate the old vote
                existingVote.Deleted = true;
                //existingVote.Answer.TotalVotes += existingVote.Value == 1 ? -1 : 1;

                if (vote.Value == existingVote.Value)
                {
                    await _context.SaveChangesAsync();

                    result.Add(existingVote.Answer.Id);
                    return await Get(result, vote.CreatedById);
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
                    //existingVote.Answer.TotalVotes += existingVote.Value == 1 ? -1 : 1;

                    //add the other answer
                    result.Add(existingVote.Answer.Id);
                }
            }

            //add the clicked answer
            result.Add(answer.Id);

            _context.Votes.Add(vote);
            //answer.TotalVotes += vote.Value;

            await _context.SaveChangesAsync();

            return await Get(result, vote.CreatedById); ;
        }
    }
}
