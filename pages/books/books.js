import html from "https://unpkg.com/navigo-utils"
import bookRepository from "../../bookRepository.js";

const template = document.createElement('template');
template.innerHTML = html`
<h2>Books Page</h2>
<em>Press the id-link for details</em>
<div style="height: 150px;overflow-y: scroll;">
  <ul></ul>
</div>
<hr />
<h4>Details</h4>
<h2 id="title"></h2>
<p id="selected-id" style="font-weight:bold"></p>
<p id="details"></p>
`

export default async function renderBooks(element, { params }) {

  const clone = template.content.cloneNode(true);
  const books = await bookRepository.getBooks()

  const listItems = books.map(book => html`
  <li>${book.title}
    <a href='#/books?id=${book.id}' data-navigo>(Details) </a>,
    <a href='#/find-book?id=${book.id}' data-navigo>(edit/delete-book)</a>
  </li>`)

  clone.querySelector("ul").innerHTML = listItems.join("")
  
  if (params && params.id) {
    const book = await bookRepository.findBook(params.id)
    clone.querySelector("#title").innerText = book.title
    clone.querySelector("#selected-id").innerText = params.id
    clone.querySelector("#details").innerText = book.info
  }

  document.getElementById(element).innerHTML = ""
  document.getElementById(element).appendChild(clone);
}

