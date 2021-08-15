const moment = require('moment')
const db = require('../models')

const Post = db.blog_Post
const itemsPerPage = 5

const postController = {
  index: async(req, res) => {
    const totalPost = await Post.count()
    const totalPage = Math.ceil(totalPost / itemsPerPage)
    Post.findAll({
      offset: 0,
      limit: itemsPerPage,
      order: [['id', 'DESC']]
    }).then((posts) => {
      console.log(posts)
      res.render('index', {
        posts,
        page: 1,
        totalPage,
        moment
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  handlePage: async(req, res) => {
    const totalPost = await Post.count()
    const totalPage = Math.ceil(totalPost / itemsPerPage)
    const page = req.params.id ? +req.params.id : 1
    const offset = (page - 1) * itemsPerPage
    Post.findAll({
      offset,
      limit: itemsPerPage,
      order: [['id', 'DESC']]
    }).then((posts) => {
      res.render('index', {
        posts,
        page,
        totalPage,
        moment
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  add: (req, res) => {
    res.render('post/add')
  },
  handleAdd: (req, res, next) => {
    const { title, content } = req.body
    if (!title || !content) {
      req.flash('errorMessage', '要有內容啦！')
      return next()
    }
    Post.create({
      title,
      content
    }).then(() => res.redirect('/'))
  },
  delete: (req, res) => {
    const { id } = req.params
    Post.findByPk(id)
      .then((post) => post.destroy())
      .then(() => {
        res.redirect('../admin')
      }).catch(() => {
        res.redirect('../admin')
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    Post.findOne({
      where: { id }
    }).then((post) => {
      res.render('post/edit', {
        post
      })
    })
  },
  handleEdit: (req, res, next) => {
    const { title, content } = req.body
    if (!title || !content) {
      req.flash('errorMessage', '要有內容啦！')
      return next()
    }
    const { id } = req.params
    Post.findOne({
      where: { id }
    }).then((post) => {
      post.update({
        title,
        content
      })
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  },
  list: (req, res) => {
    Post.findAll({ order: [['id', 'DESC']] })
      .then((posts) => {
        res.render('post/list', {
          posts,
          moment
        })
      })
  }
}
module.exports = postController
