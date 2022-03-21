const express = require('express')
const router = express.Router()
const newsRouter = require('./news')
const recruitRouter = require('./news')


router.use('/news', newsRouter)
router.use('/recruit', recruitRouter)


module.exports = router