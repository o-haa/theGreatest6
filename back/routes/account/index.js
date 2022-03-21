const express = require('express')
const router = express.Router()
const accountMngRouter = require('./management')
const accountController = require('./accountController')


router.post('/signup', accountController.signUp)
router.post('/signin', accountController.signIn)
router.use('/management', accountMngRouter)



module.exports = router