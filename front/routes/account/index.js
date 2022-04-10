const express = require('express');
const router = express.Router();
const accountMngRouter = require('./management');
const memberRouter = require('./member');
const auth = require('./member/auth');


router.use('/member', memberRouter);
router.use('/management', auth.auth ,accountMngRouter);

module.exports = router;