const pool = require('../../../db');
const { sql }= require('../../../SQL/queries.js')

let response = {
    result: [],
    errno: 1
};


exports.communityList = async (req, res) => {
    const { prepare } = req.body;
    let sql ='';
    switch (prepare.length) {
        case 1:
            sql = sql.communityList1
            break;

        case 2:
            sql = sql.communityList2
            break;

        case 3:
            sql = sql.communityList3
            break;
        case 4:
            sql = sql.communityList4
            break;
    }
    try {
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
    const boardIdxPre = idx;
    

    const {select}=req.body;
    const selectPre = [select];
    const result = await pool.execute(sql.getCategory,selectPre);
    
    const [selectidx] = result[0];
    const {subject,content}=req.body;
    const categoryIdx = selectidx.show_category_id;
    const prepare2 = [subject,content,categoryIdx,boardIdxPre];
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


        const fPrepare = [fileOriginalname,fileStoredname,fileSize,fileDate,boardIdxPre];                          

        if(req.file.size > 0){

            const [result] = await pool.execute(Sql.communityUpdateFile,fPrepare);
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
    const prepare = [idx];


    // const cmtUserName = `SELECT user_nickname FROM user WHERE user_idx = ?`
    // const cmtUserNamePre = []
    console.log(req.body.ccontent)
    const {ccontent}=req.body.ccontent;
    const useridx=req.body.user.user_idx
    const cmtSqlPre = [useridx, boardIdxPre, ccontent]
    try{
        const cmtInResult = await pool.execute(sql.commentWrite,prepare);
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
    const boardIdxPre = idx;

    try{
        const [cmtListResult] = await pool.execute(sql.commentList,prepare)
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
    const {cmt_idx}=req.body;
    console.log(req.body)
    const sql = `DELETE FROM comment WHERE cmt_idx = ?`;
    const prepare = [cmt_idx];
    try{
        const [result] = await pool.execute(sql,prepare);
        response = {
                result,
                errno:0
            };
        res.json(response);
       
    } catch (e) {
        console.log('communitydelete',e.message);
        
    };
}