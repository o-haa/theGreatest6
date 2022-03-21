const express = require('express')
const router = express.Router()
const mngController = require('./mngController')

router.get('/myinfo',mngController.myInfo)
router.get('/myticket',mngController.myTicket)
router.get('/mypic',mngController.myPic)
router.get('/mycalendar',mngController.myCalendar)
router.get('/myact',mngController.myAct)


module.exports = router

