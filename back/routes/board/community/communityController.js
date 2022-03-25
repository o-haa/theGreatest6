const { pool } = require("../../../db")

exports.communityList = (req,res) =>{
    
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
    const sql3 = `INSERT INTO board(user_idx,board_subject,board_content,show_category_idx,board_file_idx) VALUES(?,?,?,?,?)`
    
    const prepare2 = ['1',subject,content,categoryIdx]
    console.log(prepare2)

    const fileOriginalname = req.file.originalname
    const fileStoredname = req.file.filename
    const fileSize = req.file.size
    const fileDate = new Date()
    const fileDltF = '0'
    const fSql = `INSERT INTO b_file (
                                        board_file_idx,
                                        board_idx,
                                        file_originalname,
                                        file_storedname,
                                        file_size,
                                        file_date,
                                        file_dlt_flag
                                        )
                                VALUES(?,?,?,?,?,?,?)`
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

        const boardIdx = result.insertId
        const fileIdx = `SELECT * FROM b_file WHERE board_file_idx = ?`
        const prepare3 = ['1',subject,content,categoryIdx,fileIdx]
        const fPrepare = ['7',boardIdx,fileOriginalname,fileStoredname,fileSize,fileDate,fileDltF]                           

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

exports.communityView = (req,res) => {

}
