const express = require('express')
const router = express.Router()
const bookController = require('./bookController')

//예매정보 확인
router.post('/selectbookinfo', bookController.selectBookInfo)
//예매 정보 입력
router.post('/insertbookinfo', bookController.InsertBookInfo)
//좌석 정보 확인
router.post('/selectseatinfo', bookController.selectSeatInfo)
//좌석 정보 입력

module.exports = router;