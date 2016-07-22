using System.Collections.Generic;

namespace PassPast.Data.DataModels
{
    //we inherit from the baseDataModel so that we get the Id field which will be our Primary Key in the DB
    public class Course : BaseDataModel
    {
        public string Name { get; set; }

        public string Code { get; set; }

        //public virtual Papers Papers { get; set; }
        //The above commented out field is correct, but you will have to make more table classes to complete the Database for it to work

        public ICollection<Paper> Papers { get; set; }


    }
}