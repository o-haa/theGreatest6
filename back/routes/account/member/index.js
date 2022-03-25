const express = require('express')
const router = express.Router()
const memberController= require('./memberController')

router.post('/idcheck', memberController.idCheck)
router.post('/signup', memberController.signUp)
router.post('/signin', memberController.signIn)



module.exports = router