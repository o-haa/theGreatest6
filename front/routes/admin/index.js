const express = require('express')
const router = express.Router()
const adminController = require('./adminController')

// 라우터는 소문자로 작성하기
router.get('/showmanagement',adminController.showManagement)
router.get('/accountmanagement',adminController.accountManagement)
router.get('/benefitmanagement',adminController.benefitManagement)
router.get('/boardmanagement',adminController.boardManagement)
router.get('/graphicchart',adminController.graphicChart)

module.exports = router