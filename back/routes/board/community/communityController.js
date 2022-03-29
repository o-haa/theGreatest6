
const  pool  = require("../../../db")

let response = {
    result:[],
    errno:1
}

exports.communityList = async (req,res) =>{
    const sql = `SELECT board_idx, board_subject, user_idx, board_date, board_hit FROM board ORDER BY board_idx DESC`

    try{
        console.log('aa')
        const [result] = await pool.execute(sql)
        console.log('aa',result)

        response = {
            ...response,
            result,
            errno:0
        }
        res.json(response)
    } catch (e){
        console.log('에러메세지',e.message)

    }
}

exports.communityWrite = async (req,res) =>{                                
    const {select}=req.body
    const sql = "SELECT * FROM s_category WHERE show_category = ?"
    const prepare = [select]

    const result = await pool.execute(sql,prepare)
    
    const [idx] = result[0]
    const {subject,content}=req.body
    const categoryIdx = idx.show_category_id
    const sql2 = 'INSERT INTO board(user_idx,board_subject,board_content,show_category_idx) VALUES(?,?,?,?)'
    
    const prepare2 = ['117',subject,content,categoryIdx]
    console.log(prepare2)

    try{
        const [result] = await pool.execute(sql2,prepare2)
        response = {
            result:{
                row:result.affectedRows,
                insertId:result.insertId
            },
            errno:0    
        }
        res.json(response)

        const fileOriginalname = req.file.originalname
        const fileStoredname = req.file.filename
        const fileSize = req.file.size
        const fileDate = new Date()
        const fileDltF = '0'
        const fSql = `INSERT INTO b_file (
                                            board_idx,
                                            file_originalname,
                                            file_storedname,
                                            file_size,
                                            file_date,
                                            file_dlt_flag
                                            )
                                    VALUES(?,?,?,?,?,?)`

        const boardIdx = result.insertId
        const fPrepare = [boardIdx,fileOriginalname,fileStoredname,fileSize,fileDate,fileDltF]                           

        if(req.file.size > 0){


            const [result] = await pool.execute(fSql,fPrepare)
            response = {
                result:{
                    row:result.affectedRows,
                    insertId:result.insertId
                },
                errno:0    
            } 
            
        } 

    }catch(e){
        console.log(e.message)
    }
}

exports.communityView = async (req,res) => {
    const{idx}=req.params
    const prepare = [idx]


    const sql = `SELECT * FROM board WHERE board_idx = ? `
   
    try{
        const [result] = await pool.execute(sql,prepare)
        response = {
            result,
            errno:0
        }
        res.json(response)
    } catch (e) {
        console.log(e.message)
    }

}

exports.communityDelete = async (req,res) =>{
    const{idx}=req.params
    const sql = `DELETE FROM board WHERE board_idx = ? `
    const prepare = [idx]
    try{
        const [result] = await pool.execute(sql,prepare)
        response = {
                result,
                errno:0
            }
        res.json(response)
       
    } catch (e) {
        console.log(e.message)
        
    }
   
}

exports.communityUpdate = async (req,res)=>{
    const {select}=req.body
    const sql = "SELECT * FROM s_category WHERE show_category = ?"
    const prepare = [select]

    const result = await pool.execute(sql,prepare)

    const [idx] = result[0]
    const {subject,content}=req.body
    const categoryIdx = idx.show_category_id
    // const sql2 = `UPDATE board SET board_subject='${subject}', board_content='${content}', show_category_idx='${categoryIdx} WHERE board_idx='${board_idx}'`
    // const sql3 = `UPDATE board SET board_subject='${subject}', board_content='${content}', ,show_category_idx='${categoryIdx}, board_file_idx='${board_file_index}' WHERE board_idx='${board_idx}'`
    const sql2 = `UPDATE board SET board_subject=?, board_content=?, show_category_idx=? WHERE board_idx=?`
    const sql3 = `UPDATE board SET board_subject=?, board_content=?, ,show_category_idx=? WHERE board_idx=?`

    const prepare2 = [subject,content,categoryIdx]
    console.log(prepare2)

    try{
        const [result] = await pool.execute(sql2,prepare2)
        const response = {
            result:{
                row:result.affectedRows,
                insertId:result.insertId
            },
            errno:0    
        }
        res.json(response)

        const fileOriginalname = req.file.originalname
        const fileStoredname = req.file.filename
        const fileSize = req.file.size
        const fileDate = new Date()
        const fileDltF = '0'
        const fSql = `UPDATE b_file file_originalname = ?,
                                    file_storedname = ?,
                                    file_size = ?,
                                    file_date = ?,
                                    file_dlt_flag
                                    `

        const boardIdx = result.insertId
        const fileIdx = `SELECT * FROM b_file WHERE board_file_idx = ?`
        const prepare3 = [subject,content,categoryIdx,fileIdx]
        const fPrepare = [fileOriginalname,fileStoredname,fileSize,fileDate,fileDltF]                           

        if(req.file.size > 0){


            const [result] = await pool.execute(fSql,fPrepare,sql3,prepare3,)
            const response = {
                result:{
                    row:result.affectedRows,
                    insertId:result.insertId
                },
                errno:0    
            } 
            res.json(response)
        } 

    }catch(e){
        console.log(e.message)
        const response = {
            result:{
                row:0,
                inserId:0
            },
            errno:1,
        }
        res.json(response)
    }
}