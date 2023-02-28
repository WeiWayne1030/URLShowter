const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new schema({
  shortURL: { type: String, required: true },
  originalURL: { type: String, required: true },
})


module.exports = mongoose.model("URL", urlSchema)