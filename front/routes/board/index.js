const express = require('express')
const router = express.Router()
const recruitRouter = require('./recruit')
const aboutRouter = require('./about')
const communityRouter = require('./community')
const reviewRouter = require('./review')


router.use('/recruit', recruitRouter)
router.use('/about', aboutRouter)
router.use('/community', communityRouter)
router.use('/review', reviewRouter)


module.exports = router