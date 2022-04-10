const express = require('express')
const router = express.Router()
const paymentController = require('./paymentController')

//결제 수단 정보 확인
router.post('/getfullbankinfo', paymentController.getFullBankInfo)

//선택 결제 수단 확인
router.post('/getbankinfo', paymentController.getBankInfo)

//포인트 조회
router.post('/checkpoint', paymentController.checkPoint)

//row와 number로 특정 좌석 정보 가져오기
router.post('/getspecificseat', paymentController.getSpecificSeat)

//좌석 idx로 특정 좌석 정보 가져오기
router.post('/getspecificseatfromidx', paymentController.getSpecificSeatFromIdx)
//개인정보 조회
router.post('/getpersonalinfo',paymentController.getPersonalInfo)




module.exports = router;