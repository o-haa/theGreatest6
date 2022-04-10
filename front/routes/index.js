const express = require('express');
const router = express.Router();
const { mainController } = require('./mainController');
const boardRouter = require('./board');
const accountRouter = require('./account');
const showRouter = require('./show');
const adminRouter = require('./admin');
const { auth } = require('./account/member/Auth');
const OauthRouter = require('./Oauth');
const aboutRouter = require('./about');
const chatRouter = require('./chat');
const bookRouter = require('./book');
// const {levelCheck} = require('./account/member/Auth')

router.get('/', mainController);
router.use('/board',auth, boardRouter);
router.use('/show', showRouter);
router.use('/account',accountRouter);
// router.use('/admin',levelCheck,adminRouter);
router.use('/admin',adminRouter);
router.use('/oauth',OauthRouter);
router.use('/about', aboutRouter);
router.use('/chat',chatRouter)
router.use('/book',bookRouter)


module.exports = router;