using PassPast.Data;
using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace PassPast.CommonManagers
{
	public class UserManager
	{
		// You can see these details by running the program and putting a breakpoint somewhere, then clicking
		// Locals and then User
		public static string GetActiveUserId(ClaimsIdentity activeUser) {
			return activeUser.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value;
		}
		
		// Passes the db to return the User
		public static User GetUserFromDb(PassPastDbContext db, string userId)
		{
			return db.Users.SingleOrDefault(x => x.Id.ToString() == userId);
		}
	}
}