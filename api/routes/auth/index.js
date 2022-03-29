const express = require('express');
const router = express.Router();
const authController = require('./authController');

// router.get('/google', authController.google)
router.get('/kakao', authController.kakao)
// router.get('/kakao/callback', authController.kakaoCall)


module.exports = router;