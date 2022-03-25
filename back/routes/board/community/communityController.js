const {pool} = require("../../../db")

exports.communityList = (req,res) =>{
    
}

exports.communityWrite = (req,res) =>{
  
}

exports.communityView = async (req,res) =>{
    const {subject,content,file}=req.body
    console.log(req.body)
    const {nickname}=req.user
    const sql = 'INSERT INTO board(user_idx,board_subject,board_content) VALUES(?,?,?)'
    const prepare = [subject,content,file,nickname]

    try{
        const [result] = await pool.execute(sql,prepare)
        const response = {
            result:{
                row:result.affectedRows,
                inserId:result.insertId
            },
            errno:0,
        }
        console.log(response)
        res.json(response)
        // console.log(result.insetId)
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