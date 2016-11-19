using PassPast.Web.Infrastructure.Data;
using System.Collections.Generic;

namespace PassPast.Data
{
    //we inherit from the baseDataModel so that we get the Id field which will be our Primary Key in the DB
    public class CourseEntity : Entity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public ICollection<PaperEntity> Papers { get; set; }
    }
}