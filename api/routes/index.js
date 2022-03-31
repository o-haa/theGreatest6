const express = require('express');
const router = express.Router();
const oauthRouter = require('./oauth');

router.use('/auth',oauthRouter);


module.exports = router;