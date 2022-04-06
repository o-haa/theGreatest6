const express = require('express')
const router = express.Router()
const newsController = require('./newsController')

router.get('/list',newsController.newsList)
router.get('/write',newsController.newsWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.get('/view/:idx',newsController.newsView)
router.get('/update/:idx',newsController.newsUpdate)

module.exports = router