using PassPast.Data;
using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Infrastructure.Domain
{
    public class IncrimentationSchemeEntity: Entity
    {
        public string Name { get; set; }
        public ICollection<QuestionEntity> Questions { get; set; }
        public ICollection<McqAnswerEntity> McqAnswers { get; set; }
    }
}
