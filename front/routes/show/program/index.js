const express = require('express')
const router = express.Router()
const programController = require('./programController')
const {levelCheck} = require('../../account/member/Auth')

router.get('/showlist',programController.showList)
router.get('/showcard',programController.showCard)
router.get('/showcalendar', programController.showCalendar)

router.get('/showwrite/', programController.showWrite)
// router.get('/showwrite/', levelCheck, programController.showWrite)

router.get('/showview/:idx',programController.showView)
router.get('/showmodify/:idx', programController.showModify)
// router.get('/showmodify/:idx', levelCheck, programController.showModify)

router.get('/ticketopen',programController.ticketOpen) //티켓 예매까지만! 결제기능은 payment로 빠짐   
router.get('/test',programController.test)//my cal test용도

router.get('/showupload',programController.showUpload)

module.exports = router