const express = require('express')
const router = express.Router()
const bookController = require('./paymentController')

router.post('/show', bookController.show)
router.post('/seat', bookeController.seat)


module.exports = router;