using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Data.DataModels
{
	public class User : BaseDataModel
	{      
        public string ProviderId { get; set; }
    }
}