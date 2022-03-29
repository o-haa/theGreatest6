const express = require('express');
const router = express.Router();
const authController = require('./authController');

// 구글 도전? 내일 상황봐서.
// router.get('/google', authController.google)
router.get('/kakao', authController.kakao);


module.exports = router;