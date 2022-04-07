const express = require('express');
const router = express.Router();
const addressController = require('./addressController');

router.post('/kakao', addressController.kakao);

module.exports = router;