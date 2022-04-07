const express = require('express');
const router = express.Router();
const mngController = require('./mngController');
const auth = require('../member/Auth')

router.post('/getuserinfo', mngController.getUserInfo);
router.get('/myinfo', mngController.myInfo);
router.get('/myticket', mngController.myTicket);
router.get('/mypick', mngController.myPick);
router.get('/mycalendar', mngController.myCalendar);
router.get('/myact', mngController.myAct);
router.get('/mybenefit', mngController.myBenefit)

module.exports = router;

