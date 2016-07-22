﻿using PassPast.Data;
using PassPast.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using PassPast.Data.DataModels;

namespace PassPast.Controllers
{
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
            model.Papers = db.Papers.Include(paper => paper.Course).Where(paper => paper.Course.Code == CourseCode).ToList();

            ViewBag.Papers = model.Papers;
            ViewBag.CourseCode = CourseCode;
            ViewBag.PaperName = PaperName;

            return View(model);
        }
		
        public ActionResult New(string CourseCode, string PaperName)
        {
            if (CourseCode == null)
            {
                return RedirectToAction("../Home/Index");
            }

            var model = new PapersViewModel();
            model.Papers = db.Papers.Include(paper => paper.Course).Where(paper => paper.Course.Code == CourseCode).ToList();

            ViewBag.Papers = model.Papers;
            ViewBag.CourseCode = CourseCode;
            ViewBag.PaperName = PaperName;

            return View(model);
        }

        [HttpPost]
        public ActionResult AddPaper(AddPaperViewModel model)
        {
            //ForLoop testing if the paper already in the db
            var fetchPapersFromDb = db.Papers.ToList();
            foreach (var dbpaper in fetchPapersFromDb)
            {
                if (dbpaper.Name == model.PaperName)
                {
                    return RedirectToAction("New", "Papers", new { CourseCode = model.CourseCode });
                }
            }
            //Gets singular course from db with the CourseCode
            var fetchCourseFromDb = db.Courses.SingleOrDefault(x => x.Code == model.CourseCode);
            var paper = new Paper { Name = model.PaperName };
            paper.Course = fetchCourseFromDb;
            db.Papers.Add(paper);
            db.SaveChanges();

            return RedirectToAction("Index", "Papers", new { CourseCode = model.CourseCode});
        }
    }
}