const express = require('express')
const router = express.Router()
const AdmShowController = require('./AdmShowController')

// 라우터는 소문자로 작성하기
router.post('/showmgt',AdmShowController.showMgt)
router.post('/categorymgt',AdmShowController.categoryMgt)
router.post('/categorysave',AdmShowController.categorySave)

module.exports = router