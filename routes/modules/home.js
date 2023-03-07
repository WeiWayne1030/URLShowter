const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')

router.get('/', (req, res) => {
  res.render('index')
})

 //短網址頁面導向原網址頁面
router.get('/:name', (req, res) => {
  const name = req.params.name
  if (name !== 'favicon.ico' ){
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
  }
})

//修改shorten
router.get('/:name/edit', (req, res) => {
  const name = req.params.name
  URL.find()
    .then((url) => {
    const searchResult = url.find(url => url.name === name)
    const shortenURL = searchResult.name
    res.render('edit', {shortenURL} )})
    .catch(err => {
      console.log(err)
      res.render(
      'errorPage', 
      { error: err.message }
      )
    })
})

router.put('/:name', (req, res) => {
  let Newurl = req.body.url
  const name = req.params.name
  URL.find()
    .then(url => {
      let searchResult = url.find(url => url.name === name)
      searchResult.originalURL = Newurl
      searchResult.save()
     })
     .then(()=> res.redirect('/'))
     .catch(error => console.log(error))
 })

module.exports = router