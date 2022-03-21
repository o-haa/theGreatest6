const express = require('express')
const router = express.Router()
const newsRouter = require('./news')
const recruitRouter = require('./recruit')
const aboutRouter = require('./about')
const communityRouter = require('./community')
const qnaRouter = require('./qna')

router.use('/news', newsRouter)
router.use('/recruit', recruitRouter)
router.use('/about', aboutRouter)
router.use('/community', communityRouter)
router.use('/qna', qnaRouter)


module.exports = router