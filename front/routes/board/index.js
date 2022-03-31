const express = require('express')
const router = express.Router()
const newsRouter = require('./news')
const aboutRouter = require('./about')
const communityRouter = require('./community')
const reviewRouter = require('./review')
const { auth } = require('../account/member/auth')

router.use('/news', newsRouter)
router.use('/about', aboutRouter)
router.use('/community', auth, communityRouter)
router.use('/review', reviewRouter)


module.exports = router