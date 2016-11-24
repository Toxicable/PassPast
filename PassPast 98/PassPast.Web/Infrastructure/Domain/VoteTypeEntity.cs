using PassPast.Data.Domain;
using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Infrastructure.Domain
{
    public class VoteTypeEntity: Entity
    {
        public string Name { get; set; }
        public ICollection<VoteEntity> Votes { get; set; }
    }
}
