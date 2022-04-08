const express = require('express')
const router = express.Router()
const AdmAccountController = require('./AdmAccountController')

// 라우터는 소문자로 작성하기
router.post('/accountmgt',AdmAccountController.accountMgt)
router.post('/accountupdate',AdmAccountController.accountUpdate)
router.post('/insertpoint',AdmAccountController.insertPoint)
router.post('/updatepoint',AdmAccountController.updatePoint)
router.post('/deletepoint',AdmAccountController.deletePoint)


module.exports = router