const request = require('request')

const action = process.argv[2]
const parm = process.argv[3]
const parm2 = process.argv[4]
const baseURL = 'https://lidemy-book-store.herokuapp.com/books/'
const options = {
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  url: '/',
  method: 'GET',
  body: ''
}
function setOptions(action, parm, parm2) {
  switch (action) {
    case 'list':
      options.url = `${baseURL}?_limit=20`
      break
    case 'read':
      options.url = `${baseURL + parm}`
      break
    case 'delete':
      options.method = 'DELETE'
      options.url = `${baseURL + parm}`
      break
    case 'create':
      if (!parm) {
        console.log('請輸入書名')
        return
      }
      options.method = 'POST'
      options.url = baseURL
      options.body = `name=${parm}`
      break
    case 'update':
      options.method = 'PATCH'
      options.url = `${baseURL + parm}`
      options.body = `name=${parm2}`
      break
  }
}
setOptions(action, parm, parm2)
request(options, (err, response, body) => {
  try {
    const result = JSON.parse(body)
    if (Array.isArray(result)) {
      const books = result.map((book) => `${book.id} ${book.name}`)
      books.forEach((element) => {
        console.log(element)
      })
    } else if (Object.keys(result).length === 0) {
      console.log('找不到此 id ')
    } else {
      console.log(result.name)
    }
  } catch (error) {
    console.log('無效的操作')
  }
})
