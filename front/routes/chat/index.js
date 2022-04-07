const express = require('express')
const router = express.Router()
const chatRouter = require('./chatcontroller')
const { auth } = require('../account/member/auth')


router.use('/chat', chatRouter.chat)


module.exports = router