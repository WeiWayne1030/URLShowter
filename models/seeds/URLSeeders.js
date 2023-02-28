const mongoose = require('mongoose')
const ShortenURL = require('../URL')


const data = [
  {
    shortenURL: "hAs9wG",
    originalURL: "https://www.google.com/",
  }]

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb is connect!')
 
  ShortenURL.create(data)
})