const express = require('express')
const router = express.Router()
const programController = require('./programController')
const path = require('path')
const os = require('os')
const multer = require('multer')

//upload라는 미들웨어를 만듬
const upload = multer({
    storage : multer.diskStorage({
        destination : (req,file,done)=>{
            done(null,'/Users/hancoco/workspace/theGreatest6/s_uploads/')
            // /Users/hancoco/workspace/theGreatest6/s_uploads/
            // 파일 이름 뒤에 / 유무는 상관없음.
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '_' + Date.now() + ext
            //방금 지어진 파일 이름을 못 찾겠다고하면 어떡하니
            //Error: ENOENT: no such file or directory, open 's_uploads/2_1648898020479.png'
            //이래서 미들웨어 오류라고 뜨는구나
            //파일위치 오류.
            //경로 해결
            done(null,filename)
        }
    }),
    // limits: {fileSize: 5 * 1024 * 1024}
})

router.post('/showlist', programController.showList)
router.post('/showcard', programController.showCard)
router.post('/showcalendar', programController.showCalendar)

router.post('/showwrite', upload.single('upload'), programController.showWrite)
router.post('/showview/:idx', programController.showView)
router.post('/showmodify/:idx',  upload.single('upload'), programController.showModify)
router.post('/showdelete/:idx', programController.showDelete)


module.exports = router

