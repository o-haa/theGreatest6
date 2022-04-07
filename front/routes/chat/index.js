const express = require('express')
const router = express.Router()
const chatRouter = require('./chatController')
const { auth } = require('../account/member/auth')


router.use('/', chatRouter.chat)


module.exports = router