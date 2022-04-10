const express = require('express')
const router = express.Router()
const bookController = require('./bookController')

//예매정보 확인
router.post('/book_1/:showIdx', bookController.book_1)
//예매 정보 입력
router.post('/insertbookinfo', bookController.InsertBookInfo)
//좌석 정보 확인
router.post('/seatinfo', bookController.seatInfo)
//좌석 정보 입력

module.exports = router;