const express = require('express')
const router = express.Router()
const showBookRouter = require('./show')
const paymentRouter = require('./payment')

router.use('/show',showBookRouter)
router.use('/payment',paymentRouter)


module.exports = router;