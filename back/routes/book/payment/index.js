const express = require('express')
const router = express.Router()
const paymentController = require('./paymentController')

router.post('/listpay',paymentController.showPay)
router.post('/selectpay',paymentController.selectPay)
router.post('/usepoint',paymentController.usePoint)


module.exports = router;