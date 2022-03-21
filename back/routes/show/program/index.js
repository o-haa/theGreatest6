const express = require('express')
const router = express.Router()
const programController = require('./programController')

router.use('/', programController.main)
router.post('/calendar', programController.calendar)


module.exports = router

