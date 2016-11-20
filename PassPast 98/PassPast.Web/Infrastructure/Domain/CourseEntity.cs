using PassPast.Web.Infrastructure.Data;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PassPast.Data
{
    //we inherit from the baseDataModel so that we get the Id field which will be our Primary Key in the DB
    public class CourseEntity : Entity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        public ICollection<PaperEntity> Papers { get; set; }
    }
}