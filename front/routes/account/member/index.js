const express = require('express')
const router = express.Router()
const memberController = require('./memberController')

router.get('/signin',memberController.signIn)
router.get('/signup',memberController.signUp)



module.exports = router
