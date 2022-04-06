const express = require('express');
const router = express.Router();
const { mainController } = require('./mainController');
const boardRouter = require('./board');
const accountRouter = require('./account');
const showRouter = require('./show');
const adminRouter = require('./admin')

router.get('/', mainController);
router.use('/board', boardRouter);
router.use('/show', showRouter);
router.use('/account', accountRouter);
router.use('/admin',adminRouter);

module.exports = router;