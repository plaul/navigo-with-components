import html from "https://unpkg.com/navigo-utils"
import bookRepository from "../../../bookRepository.js";

const template = document.createElement('template');
template.innerHTML = html`
  <h2>Add Book</h2>
  <p><input id="input-title" placeholder="Add Title"></p>
  <p><input id="input-info" placeholder="Add Info"></p>
  <button id="btn-add-book" class="btn btn-primary">Save</button>
  <p id="added-book"></p>
`

export default function (element) {

  const clone = template.content.cloneNode(true)

  clone.querySelector("button").onclick = async () => {
    const newBook = {}
    newBook.title = document.querySelector("#input-title").value
    newBook.info = document.querySelector("#input-info").value
    const addedBook = await bookRepository.addBook(newBook);
    document.querySelector("#added-book").innerText = "Added the book: " + JSON.stringify(addedBook)
  }

  document.getElementById(element).innerHTML = ""
  document.getElementById(element).appendChild(clone);

}
