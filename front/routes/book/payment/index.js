const express = require('express')
const router = express.Router()
const paymentController = require('./paymentController')

//결제 수단 확인 및 포인트 사용 여부 체크
router.get('/payment_1',paymentController.payment_1)

//포인트 사용 시 차액을 제외한 결제 금액과 무통장 계좌번호 확인됨
router.get('/payment_2',paymentController.payment_2)


module.exports = router;