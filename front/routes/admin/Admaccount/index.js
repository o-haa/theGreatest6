const express = require('express')
const router = express.Router()
const AdmAccountController = require('./AdmAccountController')

// 라우터는 소문자로 작성하기
router.get('/accountmgt',AdmAccountController.accountMgt)

module.exports = router