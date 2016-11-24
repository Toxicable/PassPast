using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Interfaces
{
    interface IWriter<T> : IReader<T> where T : Entity
    {
        Task<int> CreateAsync(T entity);
        Task<bool> DeleteAsync(int id);
        Task UpdateAsync(int id, T entity);
    }
}
