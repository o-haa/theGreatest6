const express = require('express')
const router = express.Router()
const programController = require('./programController')

// router.use('/', programController.main)
router.post('/showlist', programController.showList)
router.post('/showcard', programController.showCard)
router.post('/showcalendar', programController.showCalendar)

router.post('/showwrite', programController.showWrite)
router.post('/showview/:idx', programController.showView)
router.post('/showmodify/:idx', programController.showModify)
router.post('/showdelete/:idx', programController.showDelete)


module.exports = router

