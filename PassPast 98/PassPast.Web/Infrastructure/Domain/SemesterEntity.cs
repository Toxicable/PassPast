using PassPast.Data;
using PassPast.Web.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Infrastructure.Domain
{
    public class SemesterEntity : Entity
    {
        public string Name { get; set; }
        public ICollection<ExamEntity> Exams { get; set; }
    }
}
