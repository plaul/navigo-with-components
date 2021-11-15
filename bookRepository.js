const URL = "http://localhost:3000/books"

const MAX_CACHE_TIME = 1000 * 60 * 10 
//const MAX_CACHE_TIME = 1000 * 6 //For testing

/* 
  This version will only call the server Once and then only after MAX_CACHE_TIME for GET-request.
  POST, PUT and DELETE will perform the operation on the server, and if OK, then update the local books array
*/
function bookRepository() {
  let books = []
  let lastCacheUpdate = 0

  const getBooks = async () => {
    const now = new Date().getTime()
    if (books.length === 0 || (now - lastCacheUpdate) > MAX_CACHE_TIME) {
      books = await fetch(URL).then(res => handleHttpError(res, `Error '${res.status} `))
      lastCacheUpdate = new Date().getTime()
    }
    return books
  }

  const findBook = async (id) => {
    if (books.length === 0) {
      return await fetch(URL + "/" + id).then(res => handleHttpError(res, "Could not find a book with the ID: " + id))
    } else {
      const book = books.find(book => book.id == id)
      if (!book) throw new Error("Could not find a book with the ID: " + id)
      return book
    }
  }

  const deleteBook = async (id) => {
    const options = makeOptions("DELETE")
    await fetch(URL + "/" + id, options).then(res => handleHttpError(res, "Could not delete a book with the ID: " + id))
    books = books.filter(book => book.id != id)
  }

  const addBook = async (bookToAdd) => {
    const options = makeOptions("POST", bookToAdd)
    const addedBook = await fetch(URL, options).then(res => handleHttpError(res, `Error '${res.status} `))
    books.length === 0 ? await getBooks() : books.push(addedBook)
    return addedBook
  }

  const editBook = async (bookToEdit, id) => {
    const options = makeOptions("PUT", bookToEdit)
    const editedBook = await fetch(URL + "/" + id, options).then(res => handleHttpError(res, `Error '${res.status} `))
    books = books.map(book => book.id == id ? editedBook : book)
  }

  return {
    // Remember all statements below are a shortcut for this version: getBooks: getBooks
    getBooks,
    findBook,
    deleteBook,
    addBook,
    editBook,
  }
}

function handleHttpError(res, msg) {
  if (!res.ok) {
    throw new Error(msg)
  }
  return res.json()
}

function makeOptions(method, body) {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

export default bookRepository();
