using OAuthAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PassPast.Data.Domain
{
    public class AnswerTypeEntity : Entity
    {
        public string Name { get; set; }
        public ICollection<AnswerEntity> Answers { get; set; }
    }
}
