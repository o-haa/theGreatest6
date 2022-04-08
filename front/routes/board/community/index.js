const express = require('express');
const router = express.Router();
const communityController = require('./communityController');
const {Auth} = require('../../account/member/Auth');

router.get('/list',communityController.communityList);
router.get('/write',communityController.communityWrite); 
router.get(`/view/:idx`,communityController.communityView);
router.get(`/update/:idx`,communityController.communityUpdate);


module.exports = router;