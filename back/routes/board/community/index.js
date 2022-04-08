const express = require('express');
const router = express.Router();
const communityController = require('./communityController');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,'uploads/c_uploads');
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname,ext) + `_${Date.now()}` + ext;
            done(null,filename);
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
});


router.post('/list',communityController.communityList);
router.post('/write',upload.single('upload'),communityController.communityWrite);  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.post(`/view/:boardIdx`,communityController.communityView);
router.post(`/delete/:boardIdx`,communityController.communityDelete);
router.post(`/update/:boardIdx`,upload.single('upload'),communityController.communityUpdate);
router.post(`/comment/:boardIdx`,communityController.communityComment)
router.post(`/commentList/:boardIdx`,communityController.communityCoList)
router.post(`/commentListDlt/:cmtIdx`,communityController.communityCoDlt)                                 
router.post(`/commentListUp/:cmtIdx`,communityController.communityCoUp)
router.post(`/likeupdate/:boardIdx`,communityController.communityLikeUp)
router.post(`/likelist/:boardIdx`,communityController.communityLikeList)
router.post(`/likeinsert/:boardIdx`,communityController.communityLikeInsert)

module.exports = router