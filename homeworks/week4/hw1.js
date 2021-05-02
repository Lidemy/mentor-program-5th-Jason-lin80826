const request = require('request')

request({
  url: 'https://lidemy-book-store.herokuapp.com/books?_limit=10'
}, (response, body) => {
  const result = JSON.parse(body.body)
  const books = result.map((book) => `${book.id} ${book.name}`)
  books.forEach((element) => {
    console.log(element)
  })
})
