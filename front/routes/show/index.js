const express = require('express')
const router = express.Router()
const programRouter = require('./program')

router.use('/program', programRouter) //예매페이지
// router.use('/payment', paymentRouter) //결제페이지

module.exports = router
