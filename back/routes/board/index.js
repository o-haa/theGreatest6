const express = require('express')
const router = express.Router()
const newsRouter = require('./news')
const boardController = require('./boardController')


router.use('/news', newsRouter)
router.post('/recruit', boardController.recruitList)


module.exports = router