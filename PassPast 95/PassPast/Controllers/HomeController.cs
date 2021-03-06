﻿using PassPast.Data;
using PassPast.Data.DataModels;
using PassPast.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PassPast.Controllers
{
	//This is a controller
	//A controller is the C part of MVC
	//This controller can be access through the route /Home/Index
	//Then part Return View() will render the page found inside Views/Home/Index.cshtml to the userr
	[Authorize]
	public class HomeController : Controller
    {
        PassPastDbContext db;
        public HomeController()
        {
            db = new PassPastDbContext();
        }
		
		public ActionResult Index()
        {
            ViewBag.Title = "Pass Past";
            var model = new CoursesViewModel();
            model.Courses = db.Courses.ToList();
            ViewBag.Courses = model.Courses;

            return View(model);
        }

        public ActionResult Written()
        {
            ViewBag.Title = "Written";

            return View();
        }

        public ActionResult New(string error)
        {
            var model = new CoursesViewModel();
            model.Courses = db.Courses.ToList();
            ViewBag.Courses = model.Courses;
            ViewBag.Error = error;
            return View(model);
        }

        [HttpGet]
        public ActionResult AddCourse()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddCourse(AddCourseViewModel model)
        {
            var fetchCoursesFromDb = db.Courses.ToList();
            foreach (var dbcourse in fetchCoursesFromDb)
            {
                if (dbcourse.Name == model.CourseName)
                {
                    return RedirectToAction("New", "Home", new { error = "Course Name Exists" });
                }
                if (dbcourse.Code == model.CourseCode)
                {
                    return RedirectToAction("New", "Home", new { error = "Course Code Exists" });
                }
            }         
            var course = new Course { Name = model.CourseName, Code = model.CourseCode };
            db.Courses.Add(course);
            db.SaveChanges();

            return RedirectToAction("Index", "Home");
        }

		public ActionResult Secret()
		{
			// Don't touch or death shall be your only ally
            // I shall /empower/ death.
			// Get out
			return Redirect("https://www.youtube.com/watch?v=3Nfo3H_9pFs");
		}
    }
}
