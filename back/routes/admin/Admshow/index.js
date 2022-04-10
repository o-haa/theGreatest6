const express = require('express')
const router = express.Router()
const AdmShowController = require('./AdmShowController')

// 라우터는 소문자로 작성하기
router.post('/showmgt',AdmShowController.showMgt)
router.post('/categorymgt',AdmShowController.categoryMgt)
router.post('/categoryadd',AdmShowController.categoryAdd)
router.post('/categorydel',AdmShowController.categoryDel)
router.post('/categorymodify',AdmShowController.categoryModify)

module.exports = router