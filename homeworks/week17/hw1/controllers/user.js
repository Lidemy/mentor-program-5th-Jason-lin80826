const bcrypt = require('bcrypt')
const moment = require('moment')
const db = require('../models')

const User = db.blog_User
const Post = db.blog_Post

const userController = {
  login: (req, res) => {
    res.render('user/login')
  },
  admin: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/')
    }
    Post.findAll({
      // 撈取資料需要關聯 Comment 和 User table
    }).then((posts) => {
      res.render('user/admin', {
        posts,
        moment
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
        req.session.roleId = user.roleId
        res.redirect('/admin')
      })
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  logout: (req, res) => {
    req.session.username = null
    req.session.roleId = null
    res.redirect('/')
  }
}

module.exports = userController
