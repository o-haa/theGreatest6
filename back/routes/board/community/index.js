const express = require('express')
const router = express.Router()
const communityController = require('./communityController')
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,'/Users/oo_ha/workspace/project/team6/theGreatest6/c_uploads')
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '-' + Date.now() + ext
            done(null,filename)
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
})


router.post('/list',communityController.communityList)
router.post('/write',upload.single('upload'),communityController.communityWrite)  //어드민만 버튼 보이게 해서 이동할 수 있도록
router.post('/view',communityController.communityView)

module.exports = router