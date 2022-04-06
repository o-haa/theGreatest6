const express = require('express');
const router = express.Router();
const oauthRouter = require('./oauth');
const addressRouter = require('./address')

router.use('/auth',oauthRouter);
router.use('/address',addressRouter)

module.exports = router;