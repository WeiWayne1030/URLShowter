const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')


app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended: true }))
app.use(routes)
app.use(methodOverride('_method'))


require('./config/mongoose')


app.listen(PORT,() => {
  console.log(`Express is running on http://localhost:${PORT}`)
})