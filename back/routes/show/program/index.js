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
            done(null,'public/uploads/s_uploads')
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '_' + ext
            done(null,filename)
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
})

router.post('/showlist', programController.showList)
router.post('/showcard', programController.showCard)
router.post('/showcalendar', programController.showCalendar)

router.post('/showwrite', upload.single('upload'), programController.showWrite)
router.post('/showview/:idx', programController.showView)
router.post('/showmodify/:idx',  upload.single('upload'), programController.showModifyGetInfo)
router.post('/showmodifygoinfo/:idx',  upload.single('upload'), programController.showModifyView)
router.post('/showdelete/:idx', programController.showDelete)


module.exports = router

