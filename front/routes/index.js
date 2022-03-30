const express = require('express');
const router = express.Router();
const { mainController } = require('./mainController');
const boardRouter = require('./board');
const accountRouter = require('./account');
const showRouter = require('./show');
const adminRouter = require('./admin');
const { auth } = require('./account/member/Auth');
const OauthRouter = require('./Oauth');

router.get('/', mainController);
router.use('/board', boardRouter);
router.use('/show', showRouter);
router.use('/account', accountRouter);
router.use('/admin',adminRouter);
router.use('/oauth',OauthRouter);


module.exports = router;