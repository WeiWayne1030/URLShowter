const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const routes = require('./routes')


app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended: true }))
app.use(routes)

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




app.listen(port,() => {
  console.log(`Express is running on http://localhost:${port}`)
})