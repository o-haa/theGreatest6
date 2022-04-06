const express = require('express')
const router = express.Router()
const AdmBoardController = require('./AdmBoardController')

// 라우터는 소문자로 작성하기
router.get('/boardmgt',AdmBoardController.boardMgt)

module.exports = router