const express = require('express')
const router = express.Router()

const chatRouter = require('./chatController.js')

router.use('/chat', chatRouter.chat)

module.exports = router