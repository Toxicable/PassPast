using PassPast.Data;
using PassPast.Data.DataModels;
using PassPast.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PassPast.Controllers
{
    public class ExamsController : Controller
    {
        PassPastDbContext db;
        public ExamsController()
        {
            db = new PassPastDbContext();
        }

		[HttpGet]
        public ActionResult Index(string CourseCode, string PaperName, string ExamName)
        {
			// Prevents typing "Exams" into the URL with no parameters
			if (CourseCode == null)
			{
				return RedirectToAction("Index", "Home");
			}
            var model = new ExamsViewModel();
			// Finds all exams with the specified CourseCode and PaperName
            model.Exams = db.Exams.Include(exam => exam.Paper).Where(exam => exam.Paper.Course.Code == CourseCode & exam.Paper.Name == PaperName).ToList();

			ViewBag.Exams = model.Exams.OrderByDescending(exam => exam.Year).ThenByDescending(exam => exam.Semester);
            ViewBag.CourseCode = CourseCode;
            ViewBag.PaperName = PaperName;
            ViewBag.ExamName = ExamName;

            return View(model);
        }

		[HttpGet]
		public ActionResult Written(string CourseCode, string PaperName, string ExamName)
        {
            var model = new ExamsViewModel();
            model.Exams = db.Exams.Include(exam => exam.Paper).Where(exam => exam.Paper.Course.Code == CourseCode & exam.Paper.Name == PaperName).ToList();
			// ExamName is passed through the URL as the concatenation of it's Year and Semester, eg 20151 is 2015 Semester 1, but
			// it's listed as separate items in the database for ordering purposes
			model.Questions = db.Questions.Include(question => question.Exam).Where(question => question.Exam.Year+question.Exam.Semester == ExamName).ToList();
            model.Answers = db.Answers.Include(answer => answer.Question).ToList();

            ViewBag.Exams = model.Exams.OrderByDescending(exam => exam.Year).ThenByDescending(exam => exam.Semester);
            ViewBag.Questions = model.Questions;
            ViewBag.Answers = model.Answers;
            ViewBag.CourseCode = CourseCode;
            ViewBag.PaperName = PaperName;
            ViewBag.ExamName = ExamName;

            return View(model);
        }

		[HttpGet]
		public ActionResult MCQ(string CourseCode, string PaperName, string ExamName)
		{
			var model = new ExamsViewModel();
			model.Exams = db.Exams.Include(exam => exam.Paper).Where(exam => exam.Paper.Course.Code == CourseCode && exam.Paper.Name == PaperName).ToList();
			model.Questions = db.Questions.Include(question => question.Exam).Where(question => question.Exam.Year + question.Exam.Semester == ExamName && question.Exam.Paper.Name == PaperName && question.Exam.Paper.Course.Code == CourseCode).ToList();
			// ExamName is passed through the URL as the concatenation of it's Year and Semester, eg 20151 is 2015 Semester 1, but
			// it's listed as separate items in the database for ordering purposes
			model.Answers = db.Answers.Include(answer => answer.Question).Where(answer => answer.Question.Exam.Year + answer.Question.Exam.Semester == ExamName && answer.Question.Exam.Paper.Name == PaperName && answer.Question.Exam.Paper.Course.Code == CourseCode).ToList();

            ViewBag.Exams = model.Exams.OrderByDescending(exam => exam.Year).ThenByDescending(exam => exam.Semester);
            ViewBag.Questions = model.Questions;
			ViewBag.Answers = model.Answers;
			ViewBag.CourseCode = CourseCode;
			ViewBag.PaperName = PaperName;
			ViewBag.ExamName = ExamName;

			return View(model);
		}

		[HttpGet]
		public ActionResult New(string CourseCode, string PaperName, string ExamName)
		{
			if (CourseCode == null)
			{
				return RedirectToAction("Index", "Home");
			}
			var model = new ExamsViewModel();
			model.Exams = db.Exams.Include(exam => exam.Paper).Where(exam => exam.Paper.Course.Code == CourseCode & exam.Paper.Name == PaperName).ToList();

            ViewBag.Exams = model.Exams.OrderByDescending(exam => exam.Year).ThenByDescending(exam => exam.Semester);
            ViewBag.CourseCode = CourseCode;
			ViewBag.PaperName = PaperName;
			ViewBag.ExamName = ExamName;

			return View(model);
		}

		[HttpGet]
		public ActionResult AddExam()
		{
			return View();
		}

		[HttpPost]
		public ActionResult AddExam(AddExamViewModel model)
		{
			// SingleOrDefault gets just one entry back, rather than Include and Where that can get bunches back
			var fetchPaperFromDb = db.Papers.SingleOrDefault(x => x.Name == model.PaperName && x.Course.Code == model.CourseCode);
			if (fetchPaperFromDb == null)
			{
				return Redirect(Request.UrlReferrer.ToString());
			}

			var ExamList = db.Exams.ToList();
			foreach (var dbexam in ExamList)
			{
				// That concatenation stuff comin' right back atcha
				if (dbexam.Year + dbexam.Semester == model.Year + model.Semester)
				{
					return RedirectToAction("New", "Exams", new { CourseCode = model.CourseCode, PaperName = model.PaperName, });
				}
			}

			var exam = new Exam { Year = model.Year, Semester = model.Semester, Type = model.TypeOfExam };
			exam.Paper = fetchPaperFromDb;
			db.Exams.Add(exam);
			db.SaveChanges();

			IEnumerable<int> numberOfQuestions = Enumerable.Range(1, model.NumberOfQuestions);
			var fetchExamFromDb = db.Exams.SingleOrDefault(x => x.Id == exam.Id);
			List<string> mcqFormatList = new List<string>();

			// Since some exams use 1, 2, 3 or I, II, III instead of A, B, C like sane people
			if (model.TypeOfExam == "MCQ")
			{
				if (model.MCQFormatOfAnswers == "ABC")
				{
					mcqFormatList.Add("A");
					mcqFormatList.Add("B");
					mcqFormatList.Add("C");
					mcqFormatList.Add("D");
					mcqFormatList.Add("E");
					mcqFormatList.Add("F");
				}
				if (model.MCQFormatOfAnswers == "123")
				{
					mcqFormatList.Add("1");
					mcqFormatList.Add("2");
					mcqFormatList.Add("3");
					mcqFormatList.Add("4");
					mcqFormatList.Add("5");
					mcqFormatList.Add("6");
				}
				if (model.MCQFormatOfAnswers == "Roman")
				{
					mcqFormatList.Add("I");
					mcqFormatList.Add("II");
					mcqFormatList.Add("III");
					mcqFormatList.Add("IV");
					mcqFormatList.Add("V");
					mcqFormatList.Add("VI");
				}
			}

			// Each question gets a set of answers. Need to change this somehow to not have to use SaveChanges() so often!
			foreach (int number in numberOfQuestions)
			{
				var question = new Question { Number = number, TotalVotes = 0 };
				question.Exam = fetchExamFromDb;

				db.Questions.Add(question);
				db.SaveChanges();

				if (model.TypeOfExam == "MCQ")
				{
					IEnumerable<int> numberOfMCQAnswers = Enumerable.Range(1, model.MCQNumberOfAnswers);
					var fetchQuestionFromDb = db.Questions.SingleOrDefault(x => x.Id == question.Id);

					foreach (int mcqAnswer in numberOfMCQAnswers)
					{
						var answer = new Answer { Votes = 0, Name = mcqFormatList[mcqAnswer - 1] };
						answer.Question = fetchQuestionFromDb;

						db.Answers.Add(answer);
					}
				}
			}
			db.SaveChanges();

			return Redirect(Request.UrlReferrer.ToString());
		}

		[HttpGet]
		public ActionResult AddAnswer()
		{
			// This doesn't have anything in it because we never actually display stuff on the AddAnswer page
			return View();
		}

		[HttpPost]
		public ActionResult AddAnswer(AddAnswerViewModel model)
		{
			// Name refers to either things like A, B, C in MCQ or the actual comment content in written
			var answer = new Answer { Name = model.Name, Votes = 0 };
			// If you were as confused as me at first, you need to do this to find the question 'object' rather than
			// just the ID, since relationships like this in the database aren't linked to the parent's ID, it's
			// actually linked to the parent itself. So we need to get that parent!
			var fetchQuestionFromDb = db.Questions.SingleOrDefault(x => x.Id == model.Question);
			if (fetchQuestionFromDb == null || model.Name == null)
			{
				return Redirect(Request.UrlReferrer.ToString());
			}
			answer.Question = fetchQuestionFromDb;
			db.Answers.Add(answer);
			db.SaveChanges();

			return Redirect(Request.UrlReferrer.ToString());
		}

		[HttpGet]
		public ActionResult AddVote()
		{
			return View();
		}

		[HttpPost]
		public ActionResult AddVote(AddVoteViewModel model)
		{
			var fetchAnswerFromDb = db.Answers.SingleOrDefault(x => x.Id == model.AnswerId);
			var fetchQuestionFromDb = db.Questions.SingleOrDefault(x => x.Id == model.QuestionId);
			if (fetchAnswerFromDb == null || fetchQuestionFromDb == null)
			{
				return Redirect(Request.UrlReferrer.ToString());
			}
			// For comment votes, check if upvote or downvote
			if (model.TypeOfVote == "Down")
			{
				fetchAnswerFromDb.Votes -= 1;
				fetchQuestionFromDb.TotalVotes -= 1;
			}
			else
			{
				fetchAnswerFromDb.Votes += 1;
				fetchQuestionFromDb.TotalVotes += 1;
			}
			db.SaveChanges();

			return Redirect(Request.UrlReferrer.ToString());
		}

		[HttpGet]
		public ActionResult GetComments(int questionId)
		{
			// Fabian never said what Select does, but it does.
			var comments = db.Comments.Where(x => x.Question.Id == questionId).Select(comment => new { comment.Content, comment.VoteCount, comment.Timestamp, comment.Id }).ToList();
			
			// Returns a Json string thing, but jQuery turns it into a list you can iterate through
			return Json(comments, JsonRequestBehavior.AllowGet);
		}


        [HttpGet]
        public ActionResult AddComment()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddComment(int questionId, string content)
        {
			var currentTime = DateTime.Now.ToString("dd'/'MM'/'yyyy");

			var newComment = new Comment { Content = content, VoteCount = 0, Timestamp = currentTime };
			var fetchQuestionFromDb = db.Questions.SingleOrDefault(x => x.Id == questionId);

			// "" instead of null because jQuery passes strings
			if (fetchQuestionFromDb == null || content == "")
			{
				return Redirect(Request.UrlReferrer.ToString());
			}

			newComment.Question = fetchQuestionFromDb;
			db.Comments.Add(newComment);
			db.SaveChanges();
			// Have to return something otherwise it won't work
			string result = "Success";

			return Json(result);
		}

		[HttpPost]
		public ActionResult AddCommentVote(AddVoteViewModel model)
		{
			var fetchAnswerFromDb = db.Comments.SingleOrDefault(x => x.Id == model.AnswerId);
			if (fetchAnswerFromDb == null)
			{
				return Redirect(Request.UrlReferrer.ToString());
			}
			if (model.TypeOfVote == "Down")
			{
				fetchAnswerFromDb.VoteCount -= 1;
			}
			else
			{
				fetchAnswerFromDb.VoteCount += 1;
			}
			db.SaveChanges();

			return Redirect(Request.UrlReferrer.ToString());
		}
	}
}