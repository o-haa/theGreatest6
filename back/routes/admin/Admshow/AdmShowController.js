const pool = require('../../../db');

//공연 관리하는 페이지
exports.categoryMgt = async (req,res) =>{
    console.log('도착')
    const sqlRead = `SELECT show_category, show_category_idx FROM s_category`
    const [result] = await pool.execute(sqlRead)
    console.log(result)
    res.json(result)
}

//공연 관리하는 페이지
exports.showMgt = (req,res) =>{
    res.send('showMgt')
}

exports.categoryAdd = async (req,res)=>{
    const add = req.body
    console.log('back add : ',add.result)

    let prepare = [add.result]
    let sql = `INSERT INTO s_category(show_category) VALUES(?)`

    const [result] = await pool.execute(sql,prepare)
    
    console.log('결과 : ',result)
    res.json(result)
}

exports.categoryDel = async (req,res)=>{
    const del = req.body
    let prepare = [del.result]
    let sql = `DELETE FROM s_category WHERE show_category=?`
    const [result] = await pool.execute(sql,prepare)
    console.log('결과 : ',result)
    res.json(result)
}

exports.categoryModify = async (req,res)=>{
    const modify = req.body
    console.log(modify.value)
    let prepare = [modify.value, modify.orig]
    let sql = `UPDATE s_category SET show_category=? WHERE show_category=?`
    const [result] = await pool.execute(sql,prepare)
    console.log('결과 : ',result)
}
