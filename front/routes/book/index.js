const express = require('express');
const router = express.Router();
const bookController = require('./bookController')

router.use('/',bookController._1)

module.exports = router;