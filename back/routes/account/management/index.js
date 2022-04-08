const express = require('express');
const router = express.Router();
const mngController = require('./mngController');
const multer = require('multer');
const path = require('path');


const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,'uploads/u_uploads');
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname,ext) + '-' + ext;
            done(null,filename);
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
});

router.post('/myinfo',upload.single('uploads'),mngController.myInfo);
router.post('/optionalinfo',mngController.optionalInfo);
router.post('/myticket',mngController.myTicket);
router.post('/mypic',mngController.myPic);
router.post('/mycalendar',mngController.myCalendar);
router.post('/myact',mngController.myAct);
router.post('/mybenefit',mngController.myBenefit);


module.exports = router;

