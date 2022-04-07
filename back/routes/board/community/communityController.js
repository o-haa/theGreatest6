const pool = require('../../../db');
let sql = require('../../../SQL/queries.js')


let response = {
result: [],
errno: 1
};

exports.communityList = async (req, res) => {
    const {category} = req.body;
    const prepare = [category]
    try {
        const [result] = await pool.execute(sql.communityList,prepare);
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
    const { category, userIdx,subject,content }=req.body;
    const prepare = [category];

    const [[result]] = await pool.execute(sql,prepare);
    const categoryIdx = result.show_category_idx;

    
    const prepare2 = [userIdx,subject,content,categoryIdx];
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

    const{ boardIdx }=req.params;
    const prepare = [ boardIdx ];
    const hitResult = await pool.execute(sql.updateHit,prepare);

    // const imgSql = `SELECT file_storedname FROM b_file WHERE board_idx = ? `
    // const imgPrepare = [idx]

    // const imgIdx = await pool.execute(imgSql,imgPrepare)
    // console.log(`/Users/oo_ha/workspace/project/team6/theGreatest6/c_uploads/${imgIdx}`)

    try{
        const [ result ] = await pool.execute(sql.communityViewFile,prepare);
        response = {
            result,
            errno:0
        };
        res.json(response);
    } catch(e) {
        console.log('/communityview',e.message);
    };

}

exports.communityDelete = async (req,res) =>{
    const prepare = [ req.params.boardIdx ];
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
    const{boardIdx}=req.params;
    const prepare1 = [ req.body.select ];
    const [[getCategory]] = await pool.execute(sql.getCategory,prepare1);

    const {subject,content}=req.body;
    const categoryIdx = getCategory.show_category_idx
    const prepare2 = [subject,content,categoryIdx,boardIdx];

    try{
        const [result1] = await pool.execute(sql.communityUpdate,prepare2);
        const response = {
            result:{
                row:result1.affectedRows,
                insertId:result1.insertId
            },
            errno:0    
        };
        res.json(response);

        const fileOriginalname = req.file.originalname;
        const fileStoredname = req.file.filename;
        const fileSize = req.file.size;
        const fileDate = new Date();
        const fSql = `UPDATE b_file SET 
                                    file_originalname = ?,
                                    file_storedname = ?,
                                    file_size = ?,
                                    file_date = ?,
                                    WHERE
                                    board_idx = ?
                                    `;

        const fPrepare = [fileOriginalname,fileStoredname,fileSize,fileDate,idx];                          

        if(req.file.size > 0){

            const [result2] = await pool.execute(sql.communityUpdateFile,fPrepare);

            response = {
                result:{
                    row:result2.affectedRows,
                    insertId:result2.insertId
                },
                errno:0    
            };
            
        };

    }catch(e){
        console.log('communityupdate',e.message);
    }
}

exports.communityComment = async (req,res)=>{
    const{ boardIdx }=req.params;
    const { userIdx, ccontent } = req.body
    const prepare = [userIdx,boardIdx,ccontent]
    
    try{
        const [result] = await pool.execute(sql.commentWrite,prepare);
        response = {
            ...response,
            result: {
                affectedRows: result.affectedRows,
                insertId: result.insertId,
            },
            errno: 0
        }
        

    }catch(e){
        console.log('communitycontent',e.message)
    }
    res.json(response)
    

    // const cListSql = `SELECT *,${cmtDate} FROM comment WHERE board_idx = ${idx}`
    // const clistResult = await pool.execute(cListSql)
}

exports.communityCoList = async (req,res)=>{
    const {boardIdx}=req.params;
    const prepare = [boardIdx]

    // const boardIdxPre = idx;
    // const cmtListSql = `SELECT * FROM comment WHERE board_idx = ${idx}`

    try{
        const [cmtList] = await pool.execute(sql.commentList,prepare)
        response = {
            ...response,
            cmtList,
            errno: 0
        }   
    }catch(e){
        console.log('communitycolist',e.message)
    }
    res.json(response)
    
}

exports.communityCoDlt = async (req,res)=>{
    const{cmtIdx}=req.params;
    const prepare = [cmtIdx];
    try{
        const [result] = await pool.execute(sql.commentDelete,prepare);
        response = {
                result,
                errno:0
            };
        res.json(response);
    } catch (e) {
        console.log('commentdelete',e.message);
    };
    
}

exports.communityCoUp = async (req,res)=>{
    const{cmtIdx}=req.params;
    const {updateComment} = req.body
    const prepare = [updateComment,cmtIdx]
    try{
        const [result] = await pool.execute(sql.commentUp,prepare);
        response = {
            ...response,
            result: {
                affectedRows: result.affectedRows,
                insertId: result.insertId,
            },
            errno: 0
        }
    }catch(e){
        console.log('/commentup',e.message)
    }
    
}