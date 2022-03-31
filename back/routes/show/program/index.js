const express = require('express')
const router = express.Router()
const programController = require('./programController')
const path = require('path')
const os = require('os')
const multer = require('multer')

const upload = multer({
    storage : multer.diskStorage({
        destination : (req,file,done)=>{
            done(null,'/Users/hancoco/workspace/theGreatest6/s_uploads')
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '_' + Date.now() + ext
            done(null,filename)
        }
    }),
    // limits: {fileSize: 5 * 1024 * 1024}
})


router.post('/showlist', programController.showList)
router.post('/showcard', programController.showCard)
router.post('/showcalendar', programController.showCalendar)

router.post('/showwrite', upload.array('s_uploads'), programController.showWrite)
router.post('/showview/:idx', programController.showView)
router.post('/showmodify/:idx',  upload.array('s_uploads'), programController.showModify)
router.post('/showdelete/:idx', programController.showDelete)


module.exports = router

