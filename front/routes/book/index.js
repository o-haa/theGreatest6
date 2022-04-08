const express = require('express');
const router = express.Router();
const bookRouter = require('./book')
const paymentRouter = require('./payment')


router.use('/book',bookRouter)
router.use('/payment',paymentRouter)




module.exports = router;