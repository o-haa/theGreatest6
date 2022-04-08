const express = require('express')
const router = express.Router()
const bookController = require('./bookController')

//공연 정보 확인 및 옵션 정보 선택 - 날짜, 장소, 시간
router.get('/book', bookController.book)
//좌석 확인 및 선택
router.get('/seat', bookController.seat)

//최종 예매 및 결제 정보 확인 - 선택한 공연에 대한 공연명/날짜/시간/장소, 좌석정보(db에 나와있는 문자 형태로 불러올), 결제 정보-무통장입금 계좌 및 금액 등
router.get('/bookInfoCheck',bookController)

module.exports = router;