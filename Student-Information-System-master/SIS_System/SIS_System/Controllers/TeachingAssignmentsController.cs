using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SIS_System.Models;

namespace SIS_System.Controllers
{
    public class TeachingAssignmentsController : Controller
    {
        private SISDBEntities db = new SISDBEntities();

        // GET: TeachingAssignments
        public async Task<ActionResult> Index()
        {
            var teachingAssignments = db.TeachingAssignments.Include(t => t.Courses).Include(t => t.Instructor).Include(t => t.StudyTerm);
            return View(await teachingAssignments.ToListAsync());
        }

        // GET: TeachingAssignments/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TeachingAssignment teachingAssignment = await db.TeachingAssignments.FindAsync(id);
            if (teachingAssignment == null)
            {
                return HttpNotFound();
            }
            return View(teachingAssignment);
        }

        // GET: TeachingAssignments/Create
        public ActionResult Create()
        {
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName");
            ViewBag.InstructorID = new SelectList(db.Instructors, "InstructorID", "InstructorFirstName");
            ViewBag.TermID = new SelectList(db.StudyTerms, "TermID", "TermName");
            return View();
        }

        // POST: TeachingAssignments/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "InstructorID,CourseID,TermID")] TeachingAssignment teachingAssignment)
        {
            if (ModelState.IsValid)
            {
                db.TeachingAssignments.Add(teachingAssignment);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", teachingAssignment.CourseID);
            ViewBag.InstructorID = new SelectList(db.Instructors, "InstructorID", "InstructorFirstName", teachingAssignment.InstructorID);
            ViewBag.TermID = new SelectList(db.StudyTerms, "TermID", "TermName", teachingAssignment.TermID);
            return View(teachingAssignment);
        }

        // GET: TeachingAssignments/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TeachingAssignment teachingAssignment = await db.TeachingAssignments.FindAsync(id);
            if (teachingAssignment == null)
            {
                return HttpNotFound();
            }
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", teachingAssignment.CourseID);
            ViewBag.InstructorID = new SelectList(db.Instructors, "InstructorID", "InstructorFirstName", teachingAssignment.InstructorID);
            ViewBag.TermID = new SelectList(db.StudyTerms, "TermID", "TermName", teachingAssignment.TermID);
            return View(teachingAssignment);
        }

        // POST: TeachingAssignments/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "InstructorID,CourseID,TermID")] TeachingAssignment teachingAssignment)
        {
            if (ModelState.IsValid)
            {
                db.Entry(teachingAssignment).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", teachingAssignment.CourseID);
            ViewBag.InstructorID = new SelectList(db.Instructors, "InstructorID", "InstructorFirstName", teachingAssignment.InstructorID);
            ViewBag.TermID = new SelectList(db.StudyTerms, "TermID", "TermName", teachingAssignment.TermID);
            return View(teachingAssignment);
        }

        // GET: TeachingAssignments/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TeachingAssignment teachingAssignment = await db.TeachingAssignments.FindAsync(id);
            if (teachingAssignment == null)
            {
                return HttpNotFound();
            }
            return View(teachingAssignment);
        }

        // POST: TeachingAssignments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            TeachingAssignment teachingAssignment = await db.TeachingAssignments.FindAsync(id);
            db.TeachingAssignments.Remove(teachingAssignment);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
