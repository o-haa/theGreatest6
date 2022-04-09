const pool = require('../../../db');

//공연 관리하는 페이지
exports.categoryMgt = async (req,res) =>{
    console.log('도착')
    const sqlRead = `SELECT show_category FROM s_category`
    const [result] = await pool.execute(sqlRead)
    console.log(result)
    res.json(result)
}

//공연 관리하는 페이지
exports.showMgt = (req,res) =>{
    res.send('showMgt')
}

exports.categorySave = async (req,res)=>{
    const arr = req.body
    console.log('arr ----> ',arr)
    const sql = `UPDATE s_category
                 SET show_category=?`
    const prepare = arr
    console.log(prepare)
    const [response] = await pool.execute(sql,prepare)
    console.log(response)
}
