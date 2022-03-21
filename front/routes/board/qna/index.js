const express = require('express')
const router = express.Router()
const qnaController = require('./qnaController')

router.get('/list',qnaController.qnaList)
router.get('/write',qnaController.qnaWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.get('/view',qnaController.qnaView)

module.exports = router