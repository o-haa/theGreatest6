const express = require('express')
const router = express.Router()
const programController = require('./programController')

router.use('/', programController.main)
router.get('/showlist',programController.showList)
router.get('/showcard',programController.showCard)

router.get('/showwrite/', programController.showWrite)
router.get('/showview/:idx',programController.showView)
router.get('/showmodify/:idx', programController.showModify)

router.get('/showcalendar', programController.showCalendar)

router.get('/showhome', programController.showHome)

router.get('/ticketopen',) //티켓 예매까지만! 결제기능은 payment로 빠짐   
router.get('/test',programController.test)//my cal test용도
module.exports = router