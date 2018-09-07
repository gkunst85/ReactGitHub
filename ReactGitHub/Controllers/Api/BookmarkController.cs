using ReactGitHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ReactGitHub.Controllers.Api
{
    public class BookmarkController : ApiController
    {
        [HttpPost]
        public IHttpActionResult CreateBookmark(Bookmark bookmark)
        {
            //if model invalid return bad request
            if (!ModelState.IsValid)
                return BadRequest();

            var session = HttpContext.Current.Session;

            if (session["Bookmarks"] == null)
                session["Bookmarks"] = new List<Bookmark>();

            List<Bookmark> bookmarks = session["Bookmarks"] as List<Bookmark>;

            //if bookmark is already in session return bad request
            if (bookmarks.Any(x => x.Id == bookmark.Id))
                return BadRequest();

            bookmarks.Add(bookmark);

            session["Bookmarks"] = bookmarks;

            //return created status and redirect to created object
            return Created(new Uri(Request.RequestUri + "/" + bookmark.Id), bookmark);
        }

        [HttpDelete]
        public IHttpActionResult DeleteBookmark(int id)
        {
            //if session is null return bookmark not found
            var session = HttpContext.Current.Session;
            if (session["Bookmarks"] == null)
                return NotFound();

            var bookmarks = session["Bookmarks"] as List<Bookmark>;
            var bookmark = bookmarks.SingleOrDefault(x => x.Id == id);

            //if bookmark was not found in session return not found
            if (bookmark == null)
                return NotFound();

            bookmarks.Remove(bookmark);

            session["Bookmarks"] = bookmarks;

            //if everything is okay status
            return Ok();
        }

        [HttpGet]
        public IHttpActionResult GetBookmarks()
        {
            //return session items
            return Ok(HttpContext.Current.Session["Bookmarks"]);
        }
    }
}
