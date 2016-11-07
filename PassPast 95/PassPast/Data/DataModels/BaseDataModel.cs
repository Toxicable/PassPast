using System.ComponentModel.DataAnnotations;

namespace PassPast.Data.DataModels
{
    public class BaseDataModel
    {
        [Key]
        public int Id { get; set; }
    }

    //the Id field on a DB Model is the primark key, since all tables will need a primary key we simple make this then inherit from it on all tables
}