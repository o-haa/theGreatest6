const express = require('express')
const router = express.Router()
const recruitController = require('./recruitController')

router.get('/list',recruitController.recruitList)
router.get('/write',recruitController.recruitWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.get('/view',recruitController.recruitView)


module.exports = router