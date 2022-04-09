const express = require('express');
const router = express.Router();
const memberController = require('./memberController');

router.get('/signin',memberController.signIn);
router.get('/signup',memberController.signUp);
router.get('/privacypolicy',memberController.privacyPolicy);
router.post('/destroycookie',memberController.destroyCookie);
router.get('/welcome',memberController.welcome)



module.exports = router;
