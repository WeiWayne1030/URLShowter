const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')

//完成製作短網址頁面
router.get('/:results', (req, res) => {
  const urlname = req.params.results
  Link.find()
    .lean()
    .then(url => {
      const searchResult = url.find(l => l.name === urlname)
      const targetURL = searchResult.originalURL
      res.redirect(targetURL)
    })
})

module.exports = router