const pool = require('../../../db');

let response = {
    result: [],
    errno: 1
};

const date = `DATE_FORMAT(board_date, '%Y-%m-%d') AS board_date`
const datetime = `DATE_FORMAT(board_date, '%Y-%m-%d %h:%i:%s') AS board_date`
const cmtDate = `DATE_FORMAT(cmt_date, '%Y-%m-%d %h:%i:%s') AS cmt_date`
const param = `board_idx,show_category_idx, board_subject, board_content, board_hit`

exports.communityList = async (req, res) => {
    const { prepare } = req.body;
    let sql ='';
    switch (prepare.length) {
        case 1:
            sql = `SELECT ${param},${date} FROM board WHERE (show_category_idx = ?) ORDER BY board_idx DESC`;
            break;

        case 2:
            sql = `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ?) ORDER BY board_idx DESC`;
            break;

        case 3:
            sql = `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? ) ORDER BY board_idx DESC`;
            break;
        case 4:
            sql = `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? ) ORDER BY board_idx DESC`;
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
    const {select}=req.body;
    const sql = "SELECT show_category_idx FROM s_category WHERE show_category = ?";
    const prepare = [select];

    const result = await pool.execute(sql,prepare);
    const [idx] = result[0];
    const {subject,content}=req.body;
    
    const categoryIdx = idx.show_category_idx;
    const sql2 = 'INSERT INTO board(user_idx,board_subject,board_content,show_category_idx) VALUES(?,?,?,?)';
    
    const prepare2 = ['134',subject,content,categoryIdx];

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
        console.log('/communitywright',e.message);
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
    const boardIdxPre = idx;

    const {select}=req.body;
    const sql = "SELECT * FROM s_category WHERE show_category = ?";
    const selectPre = [select];
    const result = await pool.execute(sql,selectPre);
    
    const [selectidx] = result[0];
    const {subject,content}=req.body;
    const categoryIdx = selectidx.show_category_id;
    const sql2 = `UPDATE board SET board_subject=?, board_content=?, show_category_idx=? WHERE board_idx=?`;
    const prepare2 = [subject,content,categoryIdx,boardIdxPre];
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

        const fPrepare = [fileOriginalname,fileStoredname,fileSize,fileDate,boardIdxPre];                          

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
        console.log('communityupdate',e.message);
    }
}

exports.communityComment = async (req,res)=>{
    const{idx}=req.params;
    const boardIdxPre = idx;


    console.log('cookie',req.cookies.user)

    // const cmtUserName = `SELECT user_nickname FROM user WHERE user_idx = ?`
    // const cmtUserNamePre = []
    console.log(req.body.ccontent)
    const {ccontent}=req.body.ccontent;
    // console.log(req.body.replay[0].ccontent)
    const cmtSql = `INSERT INTO comment(user_idx, board_idx, cmt_content) VALUES(?,?,?)`;
    const cmtSqlPre = ['134', boardIdxPre, ccontent]
    try{
        const cmtInResult = await pool.execute(cmtSql,cmtSqlPre);
        console.log(cmtInResult)
    }catch(e){
        console.log('communitycontent',e.message)
    }
    

    // const cListSql = `SELECT *,${cmtDate} FROM comment WHERE board_idx = ${idx}`
    // const clistResult = await pool.execute(cListSql)
}

exports.communityCoList = async (req,res)=>{
    const {idx}=req.params;
    const boardIdxPre = idx;

    console.log('cookie',req.cookies.user)

    const cmtListSql = `SELECT * FROM comment WHERE board_idx = ${idx}`

    try{
        const cmtListResult = await pool.execute(cmtListSql)
    }catch(e){
        console.log('communitycolist',e.message)
    }
    
}