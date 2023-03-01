const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const urls = require('./modules/urls')
const generateURL = require('./modules/generateURL')

router.use('/', home)
router.use('/urls', urls)
router.use('/generateURL', generateURL)

module.exports = router