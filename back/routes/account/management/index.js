const express = require('express');
const router = express.Router();
const mngController = require('./mngController');

router.post('/myinfo',mngController.myInfo);
router.post('/optionalinfo',mngController.optionalInfo);
router.post('/myticket',mngController.myTicket);
router.post('/mypic',mngController.myPic);
router.post('/mycalendar',mngController.myCalendar);
router.post('/myact',mngController.myAct);
router.post('/mybenefit',mngController.myBenefit);


module.exports = router;

