const express = require('express')
const router = express.Router()
const newsRouter = require('./news')
const communityRouter = require('./community')
const reviewRouter = require('./review')
const { auth } = require('../account/member/auth')
const multer = require('multer');

router.use('/news', newsRouter)
router.use('/community', auth, communityRouter)
router.use('/review', reviewRouter)


module.exports = router