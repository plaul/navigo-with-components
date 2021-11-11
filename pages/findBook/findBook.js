import html from "https://unpkg.com/navigo-utils"
import bookRepository from "../../../bookRepository.js";

const template = document.createElement('template');
template.innerHTML = html`
<input id="book-id" placeholder="Enter Book Id">
<button id="btn-find-book" class="btn btn-primary">Find Book</button>
<p id="book-id"></p>
<div id="input-fields">
  <div><input id="book-title" style="width:25em;margin-bottom:10px;"></div>
  <div><textarea id="book-info" rows="4" cols="60"></textarea></div>
</div>
<div>
  <button id="btn-delete" class="btn btn-danger">Delete Book</button>
  <button id="btn-edit" class="btn btn-primary">Edit Book</button>
</div>
<div id="error" style="margin-top:1em;font-size:larger;color:red"></div>
`

export default function (element, { params }, navigate) {

  const clone = template.content.cloneNode(true)
  document.getElementById(element).innerHTML = ""
  document.getElementById(element).appendChild(clone);

  if (params && params.id) {
    findBookAndShow(params.id)
  }

  document.querySelector("#btn-find-book").onclick = () => {
    const id = document.getElementById("book-id").value
    navigate(`/find-book?id=${id}`)
  }

  document.querySelector("#btn-delete").onclick = async () => {
    const id = document.getElementById("book-id").value
    await bookRepository.deleteBook(id)
    document.querySelector("#book-id").value = ""
    document.querySelector("#book-title").value = ""
    document.querySelector("#book-info").value = ""
  }

  document.querySelector("#btn-edit").onclick = async () => {
    const id = document.querySelector("#book-id").value
    const bookToEdit = {}
    bookToEdit.id = id
    bookToEdit.title = document.querySelector("#book-title").value
    bookToEdit.info = document.querySelector("#book-info").value
    await bookRepository.editBook(bookToEdit, id)
    findBookAndShow(id)
  }

}

async function findBookAndShow(id) {
  try {
    document.querySelector("#error").innerText = ""
    const book = await bookRepository.findBook(id)
    document.querySelector("#book-id").value = book.id
    document.querySelector("#book-title").value = book.title
    document.querySelector("#book-info").value = book.info
  } catch (err) {
    document.querySelector("#error").innerText = err.message
  }

}




