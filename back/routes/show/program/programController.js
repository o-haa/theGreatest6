const pool = require('../../../db.js')

let response = {
    result:[],
    errno:1
}

exports.showWrite = async (req,res)=>{
    // console.log(req)
    // 오 일단 upload: (binary)로 들어옴
    // 미들라우터가 이상해서 서버 터짐 뭐가 이상한거지
    //Error: ENOENT: no such file or directory, open 's_uploads/2_1648898020479.png'

    // console.log('req : ',req)
    console.log('req.body : ',req.body)
    console.log('req.response : ',response)
    console.log('req.file : ',req.file) //정보 들어옴!!!!!
    res.json(response)
}

exports.showList = async (req,res)=>{
    console.log('back / showList 라우터 접속!')

    const sql = `SELECT show_idx, show_title, show_category_idx, show_xrated FROM shows ORDER BY show_idx DESC`

    try{
        const [result] = await pool.execute(sql)
        response = {
            result,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log("showList 에러발생")
    }
    
}

exports.showCard = (req,res)=>{
    console.log('back / showCard 라우터 접속!')
}

exports.showCalendar = (req,res)=>{
    console.log('back / showCalendar 라우터 접속!')
}

exports.showView = async (req,res)=>{
    console.log('back / showView 라우터 접속!')

    const {idx} = req.params
    const sql = `select * from shows where show_idx=${idx};`

    try{
        const [result] = await pool.execute(sql)
        response = {
            result,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log("showView 에러발생")
    }
}

exports.showModify = async (req,res)=>{
    console.log('back / showModify 라우터 접속!')
    const {idx} = req.params
    
    const sqlGetShows = `
    SELECT s.show_idx, s.show_title, s.show_category_idx, s.show_xrated, s.show_company, s.show_director, s.show_content, o.show_date, o.show_place, o.show_cast1, o.show_cast2 
    FROM shows AS s LEFT JOIN s_option AS o ON s.show_idx = o.shows_idx
    WHERE s.show_idx=${idx}`
    const [result] = await pool.execute(sqlGetShows)

    response ={
        result,
        error:0
    }
    res.json(response)
}

exports.showDelete = async (req,res)=>{
    console.log('back / showDelete 라우터 접속!')
    let {idx} = req.params
    
    try{
        const sql = `DELETE FROM shows WHERE show_idx='${idx}'`
        const [result] = await pool.execute(sql)
    }
    catch(e){
        console.log("showModify 에러발생")
    }
}

exports.showCalendar = (req,res)=>{
    console.log('back / showCalendar 라우터 접속!')
}