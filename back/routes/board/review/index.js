const express = require('express')
const router = express.Router()
const reviewController = require('./reviewController')

router.post('/list',reviewController.reviewList)
router.post('/write',reviewController.reviewWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.post('/view',reviewController.reviewView)

module.exports = router