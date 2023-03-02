const express = require('express')
const { modelNames } = require('mongoose')
const router = express.Router()

const URL = require('../../models/URL')

//完成製作短網址頁面
router.get('/:name', (req, res) => {
  const name = req.params.name
  URL.find()
    .lean()
    .then(url => {
      const searchResult = url.find(url => url.name === name)
      const targetURL = searchResult.originalURL
      res.redirect(targetURL)
    })
    .catch(err => {console.log(err)
          res.render('error',{ error: err.message })
    })
})

//修改shorten
router.get('/:name/edit', (req, res) => {
  URL.find()
    .lean()
    .then((url) => res.render('edit', {url} ))
    .catch(err => {
      console.log(err)
      res.render(
      'errorPage', 
      { error: err.message }
      )
    })
})

router.put('/:name/edit', (req, res) => {
  const Newurl = req.body.url
  URL.find()
    .then(url => {
      url.originalURL = Newurl
      return url.save()
    })
    .then(()=> res.redirect('/home'))
    .catch(error => console.log(error))
})

module.exports = router