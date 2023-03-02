const express = require('express')
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

module.exports = router