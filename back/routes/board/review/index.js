const express = require('express')
const router = express.Router()
const reviewController = require('./reviewController')
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,'uploads/r_uploads');
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname,ext) + '-' + ext;
            done(null,filename);
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
});




router.post('/list',reviewController.reviewList)
router.post('/write',reviewController.reviewWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.post('/view',reviewController.reviewView)

module.exports = router