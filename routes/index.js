const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const generateURL = require('./modules/generateURL')

router.use('/', home)
router.use('/generateURL', generateURL)

module.exports = router