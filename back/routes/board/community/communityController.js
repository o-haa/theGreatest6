const pool = require('../../../db');

let response = {
result: [],
errno: 1
};


const date = `DATE_FORMAT(board_date, '%Y-%m-%d') AS board_date`
const datetime = `DATE_FORMAT(board_date, '%Y-%m-%d %h:%i:%s') AS board_date`
const cmtDate = `DATE_FORMAT(cmt_date, '%Y-%m-%d %h:%i:%s') AS cmt_date`
const bparam = `board_idx,b.user_idx,show_category_idx, board_subject, board_content, board_hit`
const uparam = `u.user_idx,user_nickname,user_level`
const param = `board_idx,show_category_idx, board_subject, board_content, board_hit`

exports.communityList = async (req, res) => {
    const { prepare } = req.body;
    console.log(prepare)
    switch (prepare.length) {
        case 1:
            sql = `SELECT * 
            FROM board AS b 
            LEFT OUTER JOIN user AS u 
            ON b.user_idx = u.user_idx 
            WHERE b.show_category_idx = ? 
            ORDER BY b.board_idx DESC`;
            break;

        case 2:
            sql = `SELECT ${bparam},${uparam},${date} 
            FROM board AS b 
            LEFT OUTER JOIN user AS u 
            ON b.user_idx = u.user_idx 
            WHERE (b.show_category_idx = ?  OR b.show_category_idx = ?)
            ORDER BY b.board_idx DESC`;
            break;

        case 3:
            sql = `SELECT ${bparam},${uparam},${date} 
            FROM board AS b 
            LEFT OUTER JOIN user AS u 
            ON b.user_idx = u.user_idx 
            WHERE (b.show_category_idx = ? OR b.show_category_idx = ?  OR b.show_category_idx = ? )
            ORDER BY b.board_idx DESC`;
            break;
        case 4:
            sql = `SELECT ${bparam},${uparam},${date} 
            FROM board AS b LEFT OUTER JOIN user AS u 
            ON b.user_idx = u.user_idx 
            WHERE (b.show_category_idx = ? OR b.show_category_idx = ?  OR b.show_category_idx = ?  OR b.show_category_idx = ? )
            ORDER BY b.board_idx DESC`;
            break;
    }
    try {
        const [result] = await pool.execute(sql, prepare);
        response = {
            ...response,
            result,
            errno: 0
        } 
        // console.log(response.result)
    } catch (e) {
        console.log('/communitylist',e.message);
    }
    res.json(response);
}



exports.communityWrite = async (req,res) =>{                                
    const { category, userIdx,subject,content }=req.body;
    const sql = 'SELECT show_category_idx FROM s_category WHERE show_category = ?';
    const prepare = [category];
    console.log(prepare)

    const [[result]] = await pool.execute(sql,prepare);
    const categoryIdx = result.show_category_idx;

    const sql2 = `INSERT INTO board(user_idx,board_subject,board_content,show_category_idx) 
                VALUES(?,?,?,?)`;
    
    const prepare2 = [userIdx,subject,content,categoryIdx];
    try{
        const [result] = await pool.execute(sql2,prepare2);
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
        const fSql = `INSERT INTO b_file (
                                            board_idx,
                                            file_originalname,
                                            file_storedname,
                                            file_size,
                                            file_date,
                                            file_dlt_flag
                                            )
                                    VALUES(?,?,?,?,?,?)`;

        const boardIdx = result.insertId;
        const fPrepare = [boardIdx,fileOriginalname,fileStoredname,fileSize,fileDate,fileDltF];                   

        if(req.file.size > 0){

            const [result] = await pool.execute(fSql,fPrepare);
            response = {
                result:{
                    row:result.affectedRows,
                    insertId:result.insertId
                },
                errno:0    
            };
            
        };

    }catch(e){
        console.log('/communitywrite',e);
    };
}

exports.communityView = async (req,res) => {
    const{idx}=req.params;
    const prepare = [idx];

    const hitSql = `UPDATE board SET board_hit = board_hit + 1 WHERE board_idx = ${idx}`
    const hitResult = await pool.execute(hitSql);
 
    const sql = `SELECT
                a.board_idx, a.user_idx, a.show_category_idx, a.board_subject, a.board_content, a.board_date, a.board_hit,
                b.board_file_idx, b.board_idx, b.file_originalname, b.file_storedname, b.file_size, b.file_date, b.file_dlt_flag
                ,${datetime} 
                FROM board AS a LEFT OUTER JOIN b_file AS b 
                ON a.board_idx = b.board_idx 
                WHERE a.board_idx = ?`;
    
    // const imgSql = `SELECT file_storedname FROM b_file WHERE board_idx = ? `
    // const imgPrepare = [idx]

    // const imgIdx = await pool.execute(imgSql,imgPrepare)
    // console.log(`/Users/oo_ha/workspace/project/team6/theGreatest6/c_uploads/${imgIdx}`)

   
    try{
        const [result] = await pool.execute(sql,prepare);
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
    const sql = `DELETE FROM board WHERE board_idx = ? `;
    const prepare = [idx];
    console.log(idx)
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

exports.communityUpdate = async (req,res)=>{
    const{idx}=req.params;

    const {select}=req.body;
    const sql = "SELECT * FROM s_category WHERE show_category = ?";
    const selectPre = [select];
    const result = await pool.execute(sql,selectPre);
    
    const [selectidx] = result[0];
    const {subject,content}=req.body;
    const categoryIdx = selectidx.show_category_id;
    const prepare2 = [subject,content,categoryIdx,idx];

    try{
        
        const [result] = await pool.execute(sql2,prepare2);
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
    const { userIdx, ccontent } = req.body
    
    const prepare = [userIdx,idx,ccontent]
    
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
    const {idx}=req.params;
    const boardIdxPre = idx;

    console.log('cookie',req.cookies.user)

    const cmtListSql = `SELECT * FROM comment WHERE board_idx = ${idx}`

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
    const{idx}=req.params;
    const prepare = [idx];
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
    const{idx}=req.params;
    const ccontent = req.body[0].cmt_content
    const prepare = [ccontent,idx]
    
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