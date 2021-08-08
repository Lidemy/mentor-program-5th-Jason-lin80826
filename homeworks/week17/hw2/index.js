const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')

const userController = require('./controllers/user')
const prizeController = require('./controllers/prize')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function checkIsLogin(req, res, next) {
  if (!req.session.username) {
    res.redirect('/login')
    return
  }
  next()
}

function redirectBack(req, res) {
  res.redirect('back')
}

app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res) => {
  res.render('draw')
})
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/admin', checkIsLogin, userController.admin)
app.get('/logout', userController.logout)
app.post('/addPrize', checkIsLogin, prizeController.handleAdd, redirectBack)
app.get('/delete/:id', checkIsLogin, prizeController.delete)
app.get('/edit/:id', checkIsLogin, prizeController.edit)
app.post('/handleEdit/:id', checkIsLogin, prizeController.handleEdit, redirectBack)
app.get('/getPrize', prizeController.getPrize)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
