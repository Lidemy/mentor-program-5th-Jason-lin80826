const bcrypt = require('bcrypt')
const db = require('../models')

const User = db.prize_User
const Prize = db.prize_prize

const userController = {
  login: (req, res) => {
    res.render('login')
  },
  admin: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Prize.findAll({
      // 撈取資料需要關聯 Comment 和 User table
    }).then((prizes) => {
      res.render('admin', {
        prizes
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '該填的沒填唷！')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = user.username
        res.redirect('admin')
      })
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  logout: (req, res) => {
    req.session.username = null
    res.redirect('/login')
  }
}

module.exports = userController
