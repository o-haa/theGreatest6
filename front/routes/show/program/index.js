const express = require('express')
const router = express.Router()
const programController = require('./programController')

router.use('/', programController.main)
router.get('/calendar', programController.calendar) //버튼 클릭 시 달력 팝업
router.get('/ticketopen',) //티켓 예매까지만! 결제기능은 payment로 빠짐   
router.get('/test',programController.test) //티켓 예매까지만! 결제기능은 payment로 빠짐   
router.get('/showview',programController.showView) //상세페이지   

module.exports = router