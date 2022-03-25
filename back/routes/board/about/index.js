const express = require('express')
const router = express.Router()
const aboutController = require('./aboutController')

router.get('/list',aboutController.aboutList)
router.get('/write',aboutController.aboutWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.get('/view',aboutController.aboutView)

module.exports = router