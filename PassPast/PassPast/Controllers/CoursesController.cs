using PassPast.CommonManagers;
using PassPast.Data;
using PassPast.Data.DataModels;
using PassPast.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace PassPast.Controllers
{
	[Authorize]
	public class CoursesController : Controller
    {
        PassPastDbContext db;

        public CoursesController()
        {
            db = new PassPastDbContext();
        }

		public ActionResult Index(string CourseCode)
		{
			if (CourseCode == null)
			{
				return RedirectToAction("Index", "Home");	// Redirects to Home/Index
			}
			ViewBag.Title = "MCQ";

			// Get a model of all courses in the database
            var model = new CoursesViewModel();
            model.Courses = db.Courses.ToList();
            ViewBag.CourseCode = CourseCode;
            ViewBag.Courses = model.Courses;

            return View(model);
		}
        public ActionResult New()
        {
			// Adds a new course to the database
            var model = new CoursesViewModel();
            model.Courses = db.Courses.ToList();

            return View(model);
        }

		public ActionResult Written()
		{
			ViewBag.Title = "Written";

			return View();
		}

        [HttpGet]
        public ActionResult AddCourse()
        {
			// This doesn't have anything in it because we never actually try to display stuff on the AddCourse page
            return View();
        }

        [HttpPost]
        public ActionResult AddCourse(AddCourseViewModel model)
        {
			// Checks whether the course already exists to prevent multiples
            var fetchCourseFromDb = db.Courses.Where(x => x.Code == model.CourseCode);
            if (fetchCourseFromDb != null)
            {
                return Redirect(Request.UrlReferrer.ToString());
            }
            var course = new Course { Name = model.CourseName, Code = model.CourseCode };

			// Attach the author to the course
			var userId = UserManager.GetActiveUserId((ClaimsIdentity)User.Identity);
			var user = UserManager.GetUserFromDb(db, userId);
			course.CreatedBy = user;

			db.Courses.Add(course);
            db.SaveChanges();

            return RedirectToAction("Index", "Home");
        }
    }
}

