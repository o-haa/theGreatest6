const express = require('express')
const router = express.Router()
const paymentController = require('./paymentController')

//결제 수단 정보 확인
router.post('/selectpay',paymentController.selectPay)
//결제 수단 입력
router.post('/insertpay',paymentController.insertPay)

//포인트 조회
router.post('/checkpoint',paymentController.checkPoint)
//포인트 사용
router.post('/usepoint',paymentController.usePoint)


module.exports = router;