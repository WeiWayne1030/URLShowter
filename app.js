const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const routes = require('./routes')


app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended: true }))
app.use(routes)

require('./config/mongoose')





app.listen(port,() => {
  console.log(`Express is running on http://localhost:${port}`)
})