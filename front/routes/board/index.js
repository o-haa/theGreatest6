const express = require('express')
const router = express.Router()
const newsRouter = require('./news')
const aboutRouter = require('./about')
const communityRouter = require('./community')
const reviewRouter = require('./review')
const { Auth } = require('../account/member/Auth')

router.use('/news', newsRouter)
router.use('/about', aboutRouter)
router.use('/community', Auth, communityRouter)
router.use('/review', reviewRouter)


module.exports = router