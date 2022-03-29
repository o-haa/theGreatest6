const express = require('express');
const router = express.Router();
const oauthController = require('./oauthController');

router.get('/kakao', oauthController.kakao);


module.exports = router;