const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const postController = require('./controllers/post')
const userController = require('./controllers/user')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())

app.use(express.static(`${__dirname}/public`))

function redirectBack(req, res) {
  res.redirect('back')
}
function checkIsLogin(req, res, next) {
  if (!req.session.username) {
    res.redirect('/')
    return
  }
  next()
}

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.roleId = req.session.roleId
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})
app.get('/', postController.index)
app.get('/page/:id', postController.handlePage)
app.get('/admin', checkIsLogin, userController.admin)
app.get('/add', checkIsLogin, postController.add)
app.post('/handleAdd', checkIsLogin, postController.handleAdd, redirectBack)
app.get('/delete/:id', checkIsLogin, postController.delete)
app.get('/edit/:id', checkIsLogin, postController.edit)
app.post('/handleEdit/:id', checkIsLogin, postController.handleEdit, redirectBack)
app.get('/list', postController.list)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
