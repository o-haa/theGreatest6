const express = require('express');
const router = express.Router();
const OauthController = require('./OauthController');

router.get('/kakao',OauthController.kakao);

module.exports = router;