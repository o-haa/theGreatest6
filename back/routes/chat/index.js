const express = require('express');
const router = express.Router();
const chatController = require('./chatController');


router.post(`/`,chatController.chat)

module.exports = router