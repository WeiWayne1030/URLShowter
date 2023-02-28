const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

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
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.send('this is the URLShorter')
})

app.listen(port,() => {
  console.log(`Express is running on http://localhost:${port}`)
})