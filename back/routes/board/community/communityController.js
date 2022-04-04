const pool = require('../../../db');
let {sql} = require('../../../SQL/queries.js')

const param = 'board_idx, show_category_idx, board_subject, board_content, board_hit'
const date = `DATE_FORMAT(board_date, '%Y-%m-%d') AS board_date`

let response = {
result: [],
errno: 1
};

exports.communityList = async (req, res) => {
    const { prepare } = req.body;
    switch (prepare.length){
        case 1:
            sql = `SELECT ${param},${date} FROM board WHERE (show_category_idx = ?) ORDER BY board_idx DESC;`
        break;
        case 2:
            sql = `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ?) ORDER BY board_idx DESC;`
        break;
        case 3:
            sql = `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? ) ORDER BY board_idx DESC`;
        break;
        case 4:
            sql = `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? ) ORDER BY board_idx DESC`;
        break;
    }
    try {
        // console.log(sql)
        const [result] = await pool.execute(sql, prepare);
        response = {
            ...response,
            result,
            errno: 0
        } 
    } catch (e) {
        console.log('/communitylist',e.message);
    }
    res.json(response);
}



exports.communityWrite = async (req,res) =>{                                
    const {select}=req.body;
    const prepare = [select];

    const result = await pool.execute(sql.getCategoryIdx,prepare);
    const [idx] = result[0];
    const {subject,content}=req.body;
    
    const categoryIdx = idx.show_category_idx;
    const prepare2 = ['134',subject,content,categoryIdx];

    try{
        const [result] = await pool.execute(sql.communityWrite,prepare2);
        response = {
            result:{
                row:result.affectedRows,
                insertId:result.insertId
            },
            errno:0    
        };
        res.json(response)
        
        const fileOriginalname = req.file.originalname;
        const fileStoredname = req.file.filename;
        const fileSize = req.file.size;
        const fileDate = new Date();
        const fileDltF = '0';

        const boardIdx = result.insertId;
        const fPrepare = [boardIdx,fileOriginalname,fileStoredname,fileSize,fileDate,fileDltF];                   

        if(req.file.size > 0){

            const [result] = await pool.execute(sql.communityWriteFile,fPrepare);
            response = {
                result:{
                    row:result.affectedRows,
                    insertId:result.insertId
                },
                errno:0    
            };
            
        };

    }catch(e){
        console.log('/communitywrite',e.message);
    };
}

exports.communityView = async (req,res) => {
    const{idx}=req.params;
    const prepare = [idx];

    const hitResult = await pool.execute(sql.updateHit,prepare);
 
    
    // const imgSql = `SELECT file_storedname FROM b_file WHERE board_idx = ? `
    // const imgPrepare = [idx]

    // const imgIdx = await pool.execute(imgSql,imgPrepare)
    // console.log(`/Users/oo_ha/workspace/project/team6/theGreatest6/c_uploads/${imgIdx}`)

   
    try{
        const [result] = await pool.execute(sql.communityViewFile,prepare);
        response = {
            result,
            errno:0
        };
        res.json(response);
        // console.log(response)
    } catch(e) {
        console.log('/communityview',e.message);
    };

}

exports.communityDelete = async (req,res) =>{
    const{idx}=req.params;
    const prepare = [idx];
    console.log(idx)
    try{
        const [result] = await pool.execute(sql.communityDelete,prepare);
        response = {
                result,
                errno:0
            };
        res.json(response);
       
    } catch (e) {
        console.log('communitydelete',e.message);
        
    };
   
}

exports.communityUpdate = async (req,res)=>{
    const{idx}=req.params;

    const {select}=req.body;
    const selectPre = [select];
    const result = await pool.execute(sql.getCategory,selectPre);
    
    const [selectidx] = result[0];
    const {subject,content}=req.body;
    const categoryIdx = selectidx.show_category_id;
    const prepare2 = [subject,content,categoryIdx,idx];
    try{
        
        const [result] = await pool.execute(sql.communityUpdate,prepare2);
        const response = {
            result:{
                row:result.affectedRows,
                insertId:result.insertId
            },
            errno:0    
        };
        res.json(response);

        const fileOriginalname = req.file.originalname;
        const fileStoredname = req.file.filename;
        const fileSize = req.file.size;
        const fileDate = new Date();


        const fPrepare = [fileOriginalname,fileStoredname,fileSize,fileDate,idx];                          

        if(req.file.size > 0){

            const [result] = await pool.execute(sql.communityUpdateFile,fPrepare);
            response = {
                result:{
                    row:result.affectedRows,
                    insertId:result.insertId
                },
                errno:0    
            };
            
        };

    }catch(e){
        console.log('communityupdate',e.message);
    }
}

exports.communityComment = async (req,res)=>{
    const{idx}=req.params;
    // const cmtUserName = `SELECT user_nickname FROM user WHERE user_idx = ?`
    // const cmtUserNamePre = []
    const {ccontent}=req.body;
    const useridx=req.body.user.user_idx
    const cmtSqlPre = [useridx, idx, ccontent]
    console.log(cmtSqlPre)
    try{
        const [cmtInResult] = await pool.execute(sql.commentWrite,cmtSqlPre);
        response = {
            ...response,
            cmtInResult,
            errno: 0
        } 
    }catch(e){
        console.log('communitycontent',e.message)
    }
    
}

exports.communityCoList = async (req,res)=>{
    const {idx}=req.params;
    const boardIdxPre = [idx];

    try{
        const [cmtListResult] = await pool.execute(sql.commentList,boardIdxPre)
        response = {
            ...response,
            cmtListResult,
            errno: 0
        } 
        console.log('start',cmtListResult)
    }catch(e){
        console.log('communitycolist',e.message)
    }
    res.json(response)
    
}

exports.communityCoDlt = async (req,res)=>{
    const{idx}=req.params;
    const prepare = [idx];
    try{
        const [result] = await pool.execute(sql.communityDelete,prepare);
        response = {
                result,
                errno:0
            };
        res.json(response);
       
    } catch (e) {
        console.log('communitydelete',e.message);
    };
    
}