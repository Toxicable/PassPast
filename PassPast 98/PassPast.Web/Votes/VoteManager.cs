using AutoMapper;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Votes
{
    public interface IVoteManager
    {
        Task Create(VoteEntity vote);
    }
    public class VoteManager: IVoteManager
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public VoteManager(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }        

        public async Task Create(VoteEntity vote)
        {
            if(vote.Answer != null)
            {
                vote.Answer.TotalVotes += vote.Value;
            }
            else if(vote.Comment != null)
            {
                vote.Comment.TotalVotes += vote.Value;
            }
            else
            {
                throw new Exception("vote must either be a comment vote or answer vote");
            }

            vote.CreatedAt = DateTimeOffset.Now;

            _context.Votes.Add(vote);
            await _context.SaveChangesAsync();
        }
    }
}
