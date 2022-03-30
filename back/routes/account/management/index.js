const express = require('express');
const router = express.Router();
const mngController = require('./mngController');

router.post('/information',mngController.info);
router.post('/myticket',mngController.myTicket);
router.post('/mypic',mngController.myPic);
router.post('/mycalendar',mngController.myCalendar);
router.post('/myact',mngController.myAct);


module.exports = router;

