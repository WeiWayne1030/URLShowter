const express = require('express')
const router = express.Router() 
const URL = require('../../models/URL')
function generateURL(){
  const URLCode = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
//最多index會介於0-61之間
const Max = 61
const min = 0
 
 let results = ''
  
 for (let i = 1; i <= 5; i++){
    const randomIndex = Math.floor(Math.random()*(Max-min+1)+ min)
    const radomWord = URLCode[randomIndex]
    results += radomWord
  }
  return results
}


  router.post('/', (req, res) => {
  const original = req.body.url       // 從 req.body 拿出表單裡的 url 資料
  if (!original) return //若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者
  URL.find()
    .lean()
    .then(urls => {
      const searchResult = urls.find(url => url.originalURL === original)
      if (searchResult) {     // 輸入相同網址時，產生一樣的縮址
        const result = searchResult.shortenURL
        return res.render('result', { result })
    }
    const name = generateURL()
    const originalURL = original
  const shortenURL = `http://localhost:3000/${name}`
  return URL.create({name, shortenURL, originalURL })     // 存入資料庫
    .then(() => res.render('result', { result: shortenURL }))// 新增完成後導回首頁
  })
    .catch(err => {console.log(err)
          res.render('error',{ error: err.message })
    })
  })

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

router.post('/:name/edit', (req, res) => {
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






 