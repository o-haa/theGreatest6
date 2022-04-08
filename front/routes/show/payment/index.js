const express = require('express')
const router = express.Router()
const programController = require('./paymentController')
const {levelCheck} = require('../../account/member/Auth')

router.get('/ticketbooking',programController.ticketBooking)

module.exports = router