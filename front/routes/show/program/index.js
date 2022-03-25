const express = require('express')
const router = express.Router()
const programController = require('./programController')

router.use('/', programController.main)
router.get('/calendar',programController.calendar) //버튼 클릭 시 달력 팝업
router.get('/showlist',programController.showList) //리스트 페이지   
router.get('/showgrid',programController.showGrid) //그리드 페이지   
router.get('/showview',programController.showView) //상세페이지   

router.get('/ticketopen',) //티켓 예매까지만! 결제기능은 payment로 빠짐   
router.get('/test',programController.test)//my cal test용도
module.exports = router