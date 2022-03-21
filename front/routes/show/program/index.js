const express = require('express')
const router = express.Router()
const programController = require('./programController')

router.use('/', programController.main)
router.get('/calendar', programController.calendar) //버튼 클릭 시 달력 팝업
router.get('/ticketopen',)    //티켓 예매 오픈일


module.exports = router