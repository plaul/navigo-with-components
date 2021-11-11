import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import renderHome from "./pages/home/home.js"
import renderAbout from "./pages/about/about.js"
import renderBooks from "./pages/books/books.js"
import renderAddBook from "./pages/addBook/addBook.js"
import renderFindBook from "./pages/findBook/findBook.js"

import { adjustForMissingHash, setActiveLink } from "./utils.js"

window.addEventListener("load", async () => {

  const router = new Navigo("/", { hash: true });
  adjustForMissingHash()
  router
    .hooks({
      before(done, match) {
        setActiveLink("topnav", match.url)
        done()
      }
    })
    .on({
      "/": () => renderHome("content"),
      "/about": () => renderAbout("content"),
      "/books": (match) => renderBooks("content", match),
      "/add-book": () => renderAddBook("content"),
      "/find-book": (match) => renderFindBook("content", match, router.navigate)
    })
    .notFound(() => document.querySelector("#content").innerText = "No page for this route found")
    .resolve()
});


window.onerror = (e) => alert(e)