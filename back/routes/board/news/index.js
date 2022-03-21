const express = require('express')
const router = express.Router()
const newsController = require('./newsController')

router.post('/list',newsController.newsList)
router.post('/write',newsController.newsWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.post('/view',newsController.newsView)


module.exports = router