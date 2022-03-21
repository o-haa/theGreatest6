const express = require('express')
const router = express.Router()
const communityController = require('./communityController')

router.get('/list',communityController.communityList)
router.get('/write',communityController.communityWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.get('/view',communityController.communityView)

module.exports = router