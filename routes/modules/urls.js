const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')

//完成製作短網址頁面
router.get('/', (req, res) => {
  const urlname = req.params.url
  URL.find()
    .lean()
    .then(url => {
      const searchResult = url.find(l => l.name === urlname)
      const targetURL = searchResult.originalURL
      res.redirect(targetURL)
    })
})

module.exports = router