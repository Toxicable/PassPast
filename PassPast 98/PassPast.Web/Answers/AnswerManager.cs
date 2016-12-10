using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Answers
{
    public interface IAnswerManager
    {
        Task Create(AnswerEntity answer);
    }

    public class AnswerManager: IAnswerManager
    {
        private readonly ApplicationDbContext _context;

        public AnswerManager(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Create(AnswerEntity answer)
        {
            answer.CreatedAt = DateTimeOffset.Now;

            //TODO: remove this when we can auth the user con the connection
            answer.CreatedById = "b7675d91-c236-4890-b8e3-3630956cb75b";

            _context.Add(answer);
            await _context.SaveChangesAsync();
        }
    }
}
