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
    public class StudyTermsController : Controller
    {
        private SISDBEntities db = new SISDBEntities();

        // GET: StudyTerms
        public async Task<ActionResult> Index()
        {
            return View(await db.StudyTerms.ToListAsync());
        }

        // GET: StudyTerms/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            StudyTerm studyTerm = await db.StudyTerms.FindAsync(id);
            if (studyTerm == null)
            {
                return HttpNotFound();
            }
            return View(studyTerm);
        }

        // GET: StudyTerms/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: StudyTerms/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "TermID,TermName,TermStartDate,TermEndDate,TermYear,TermSeason")] StudyTerm studyTerm)
        {
            if (ModelState.IsValid)
            {
                db.StudyTerms.Add(studyTerm);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(studyTerm);
        }

        // GET: StudyTerms/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            StudyTerm studyTerm = await db.StudyTerms.FindAsync(id);
            if (studyTerm == null)
            {
                return HttpNotFound();
            }
            return View(studyTerm);
        }

        // POST: StudyTerms/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "TermID,TermName,TermStartDate,TermEndDate,TermYear,TermSeason")] StudyTerm studyTerm)
        {
            if (ModelState.IsValid)
            {
                db.Entry(studyTerm).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(studyTerm);
        }

        // GET: StudyTerms/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            StudyTerm studyTerm = await db.StudyTerms.FindAsync(id);
            if (studyTerm == null)
            {
                return HttpNotFound();
            }
            return View(studyTerm);
        }

        // POST: StudyTerms/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            StudyTerm studyTerm = await db.StudyTerms.FindAsync(id);
            db.StudyTerms.Remove(studyTerm);
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
