const URL = "http://localhost:3000/books"

function bookRepository() {
  const getBooks = async () => fetch(URL).then(res => res.json())

  const findBook = async (id) =>  fetch(URL+"/"+id).then(res => res.json())
  
  const deleteBook = (id) => {
    const options = makeOptions("DELETE")
    return fetch(URL + "/" + id, options)
  }

  const addBook = async (book) => {
    const options = makeOptions("POST", book)
    return fetch(URL, options).then(res => res.json())
  }

  const editBook = async (book, id) => {
    const options = makeOptions("PUT", book)
    return fetch(URL + "/" + id, options).then(res => res.json())
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

function makeOptions(method, body) {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if (body) { //Observe how we can add new fields to an object when needed
    opts.body = JSON.stringify(body);
  }
  return opts;
}

export default bookRepository();
