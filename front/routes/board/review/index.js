const express = require('express')
const router = express.Router()
const reviewController = require('./reviewController')

router.get('/list',reviewController.reviewList)
router.get('/write',reviewController.reviewWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.get('/view',reviewController.reviewView)

module.exports = router