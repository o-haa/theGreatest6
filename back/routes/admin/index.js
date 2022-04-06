const express = require('express')
const router = express.Router()
const adminController = require('./adminController')
const showRouter = require('./Admshow')
const accountRouter = require('./Admaccount')
const boardRouter = require('./Admboard')


// 라우터는 소문자로 작성하기
router.use('/account',accountRouter)
router.use('/show',showRouter)
router.use('/board',boardRouter)
router.get('/graphicchart',adminController.graphicChart)

module.exports = router