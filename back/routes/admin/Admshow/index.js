const express = require('express')
const router = express.Router()
const AdmShowController = require('./AdmShowController')

// 라우터는 소문자로 작성하기
router.get('/showmgt',AdmShowController.showMgt)
router.get('/categorymgt',AdmShowController.categoryMgt)

module.exports = router