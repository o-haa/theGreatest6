const express = require('express');
const router = express.Router();
const callBackRouter = require('./callback');

router.use('/callback',callBackRouter);



module.exports = router;
