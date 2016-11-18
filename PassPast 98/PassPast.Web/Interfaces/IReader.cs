using PassPast.Data;
using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PassPast.Web.Interfaces
{
    interface IReader<T> where T : IEntity
    {
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);

        Task<T> Get(int id);
        Task<T> GetFirst(Expression<Func<T, bool>> predicate);
        Task<T> GetSingle(Expression<Func<T, bool>> predicate);

        IQueryable GetAll(Expression<Func<T, bool>> predicate = null);
    }
    
}
