﻿using PassPast.Data;
using PassPast.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using PassPast.Data.DataModels;
using PassPast.CommonManagers;
using System.Security.Claims;

namespace PassPast.Controllers
{
	[Authorize]
    public class PapersController : Controller
    {
        PassPastDbContext db;
        public PapersController()
        {
            db = new PassPastDbContext();
        }
		
		public ActionResult Index(string CourseCode, string PaperName)
        {
			if (CourseCode == null)
			{
				return RedirectToAction("Index", "Home");
			}
            var model = new PapersViewModel();
            //Papers are now displayed in numerical order
            model.Papers = db.Papers.Include(paper => paper.Course).Where(paper => paper.Course.Code == CourseCode).OrderBy(paper => paper.Name).ToList();

			ViewBag.Stage1Papers = model.Papers.Where(paper => paper.Name.Substring(0,1).Equals("1"));
			ViewBag.Stage2Papers = model.Papers.Where(paper => paper.Name.Substring(0, 1).Equals("2"));
			ViewBag.Stage3Papers = model.Papers.Where(paper => paper.Name.Substring(0, 1).Equals("3"));

			ViewBag.Papers = model.Papers;
            ViewBag.CourseCode = CourseCode;
            ViewBag.PaperName = PaperName;

            return View(model);
        }
		
        public ActionResult New(string CourseCode, string PaperName, string error)
        {
            if (CourseCode == null)
            {
                return RedirectToAction("../Home/Index");
            }

            var model = new PapersViewModel();
            //When a new paper is being added, papers are displayed in numerical order
            model.Papers = db.Papers.Include(paper => paper.Course).Where(paper => paper.Course.Code == CourseCode).OrderBy(paper => paper.Name).ToList();

            ViewBag.Papers = model.Papers;
            ViewBag.Error = error;
            ViewBag.CourseCode = CourseCode;
            ViewBag.PaperName = PaperName;

            return View(model);
        }

        [HttpPost]
        public ActionResult AddPaper(AddPaperViewModel model)
        {
            //Testing if the paper already in the db
            var paperInDb = db.Papers.SingleOrDefault(x => x.Name == model.PaperName && x.Course.Code == model.CourseCode);
            
            if (paperInDb != null)
            {
                return RedirectToAction("New", "Papers", new { CourseCode = model.CourseCode, error = "Paper Exists" });
            }
            
            //Gets singular course from db with the CourseCode
            var fetchCourseFromDb = db.Courses.SingleOrDefault(x => x.Code == model.CourseCode);
            var paper = new Paper { Name = model.PaperName };
            paper.Course = fetchCourseFromDb;

			// Attach the author to the paper
			var userId = UserManager.GetActiveUserId((ClaimsIdentity)User.Identity);
			var user = UserManager.GetUserFromDb(db, userId);
			paper.CreatedBy = user;

			db.Papers.Add(paper);
            db.SaveChanges();

            return RedirectToAction("Index", "Papers", new { CourseCode = model.CourseCode});
        }
    }
}