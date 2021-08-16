const db = require('../models')

const Prize = db.prize_prize

const prizeController = {
  handleAdd: (req, res, next) => {
    const { prizeName, Url, content, probability } = req.body
    if (!prizeName || !Url || !content || !probability) {
      req.flash('errorMessage', '要有內容啦！')
      return next()
    }
    Prize.create({
      prizeName,
      Url,
      content,
      probability
    }).then(() => res.redirect('/admin'))
  },
  delete: (req, res) => {
    const { id } = req.params
    Prize.findByPk(id)
      .then((post) => post.destroy())
      .then(() => {
        res.redirect('/admin')
      }).catch(() => {
        res.redirect('/admin')
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    Prize.findOne({
      where: { id }
    }).then((prize) => {
      res.render('edit', {
        prize
      })
    })
  },
  handleEdit: (req, res, next) => {
    const { prizeName, Url, content, probability } = req.body
    if (!prizeName || !Url || !content || !probability) {
      req.flash('errorMessage', '要有內容啦！')
      return next()
    }
    const { id } = req.params
    Prize.findOne({
      where: { id }
    }).then((prize) => {
      prize.update({
        prizeName,
        Url,
        content,
        probability
      })
    }).then(() => {
      res.redirect('/admin')
    }).catch(() => {
      res.redirect('/admin')
    })
  },
  getPrize: (req, res) => {
    Prize.findAll({})
      .then((prizes) => {
        const prizeArr = generateIndex(prizes)
        const randomNumber = getRandom(0, prizeArr.length - 1)
        const prizeIndex = prizeArr[randomNumber]
        res.json(prizes[prizeIndex])
      }).catch((err) => {
        console.log(err)
      })
  }
}

function generateIndex(data) {
  const indexArray = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].probability; j++) {
      indexArray.push(i)
    }
  }
  return indexArray
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = prizeController
