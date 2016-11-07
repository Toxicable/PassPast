using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.ViewModels
{
    public class AnswersViewModel
    {
        public ICollection<Answer> Answers { get; set; }
    }
}