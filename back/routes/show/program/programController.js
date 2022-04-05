const pool = require('../../../db');
const { sql }= require('../../../SQL/queries.js')

let response = {
    result:[],
    errno:1
}

exports.showWrite = async (req,res)=>{
    // console.log('req.file : ',req.file) //파일
    // console.log('req.body : ',req.body) //텍스트
    
    const {category, xrated, title, place, showCast1, showCast2, showDirector,showCompany,showContent,showMonth,showDate,showHour,ticketMonth,ticketDate,ticketHour} = req.body
    console.log('/write 체크용 ----> req.body', req.body)
    //ticket 들어온거 확인함.

    let now = new Date()
    let thisYear = now.getFullYear()

    //timestamp 형식으로 가공하는 함수
    const timestampShow = `${thisYear}-${showMonth}-${showDate} ${showHour}:00`
    const timestampTicket = `${thisYear}-${ticketMonth}-${ticketDate} ${ticketHour}:00`
    
    const sqlShow = `INSERT INTO shows(
        show_title,
        show_category_idx,
        show_xrated,
        show_company,
        show_director,
        show_like,
        show_date_open,
        show_content
        ) VALUES( ?,?,?,?,?,1,?,? )`
    
    const prespareShow = [title,category,xrated,showCompany,showDirector,timestampTicket,showContent]
    
    const sqlOption = `INSERT
        INTO s_option(shows_idx, show_date, show_place, show_cast1, show_cast2)
        VALUES (?,?,?,?,?)`

    try{
        //sql 입력
        const [resultShow] = await pool.execute(sqlShow,prespareShow)
        let insertShowId = resultShow.insertId

        const prespareOption = [insertShowId, timestampShow, place, showCast1, showCast2]
        const [resultOption] = await pool.execute(sqlOption,prespareOption)
        let insertOptionId = resultOption.insertId

        const fileOriginalname = req.file.originalname;
        const fileStoredname = req.file.filename;
        const fileSize = req.file.size;
        const fileDate = new Date();
        const fileDltF = '0'; //이건 무슨 값이지
        const fileSql = `INSERT INTO s_file (
                                            show_idx,
                                            file_originalname,
                                            file_storedname,
                                            file_size,
                                            file_date,
                                            file_dlt_flag
                                            )
                                    VALUES(?,?,?,?,?,?)`;
        const filePrepare = [insertShowId,fileOriginalname,fileStoredname,fileSize,fileDate,fileDltF];

        if(req.file.size > 0){
            const [resultFile] = await pool.execute(fileSql,filePrepare);

            response = {
                result:{
                    insertShowId,
                    insertOptionId
                },
                errno:0
            }
        }
        res.json(response)
    }catch(e){
        console.log('/showwrite',e)
    }
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
        console.log('/showlist',e.message)
    }
    
}

exports.showCard = (req,res)=>{
    console.log('showCard : ',req.body)
    //아이디가 있다고 치고,
}

exports.showCalendar = (req,res)=>{
    console.log('back / showCalendar 라우터 접속!')
}

exports.showHome = async (req,res)=>{
    console.log('Home')
}

exports.showView = async (req,res)=>{
    console.log('back / showView 라우터 접속!')

    const {idx} = req.params
    const sql = `SELECT s.show_idx, s.show_title, s.show_category_idx, s.show_xrated, s.show_company, s.show_director, s.show_content, s.show_date_open, o.show_date, o.show_place, o.show_cast1, o.show_cast2 
    FROM shows AS s LEFT JOIN s_option AS o ON s.show_idx = o.shows_idx
    WHERE s.show_idx=${idx} `

    try{
        const [result] = await pool.execute(sql)
        response = {
            result,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log('/showview',e.message)
    }
}

//입력받은 기존 값을 불러오는 라우터
exports.showModifyGetInfo = async (req,res)=>{
    console.log('showModifyGetInfo 접속')
    const {idx} = req.params
    console.log('idx : ',idx)
    
    const sqlGetShows = `
    SELECT s.show_idx, s.show_title, s.show_category_idx, s.show_xrated, s.show_company, s.show_director, s.show_content, o.show_date, o.show_place, o.show_cast1, o.show_cast2 
    FROM shows AS s LEFT JOIN s_option AS o ON s.show_idx = o.shows_idx
    WHERE s.show_idx=${idx}`

    try{
        const [result] = await pool.execute(sqlGetShows)

        response ={
            result,
            error:0
        }
        res.json(response)
    }
    catch(e){
        console.log(e)
    }
}

//새로 입력받은 값을 update하는 라우터
exports.showModifyView = async (req,res)=>{
    console.log('showModifyView 접속!')
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
        console.log('/showmodify', e.message)
    }
}

exports.showCalendar = (req,res)=>{
    console.log('back / showCalendar 라우터 접속!')
    try{
        // const [result] = await pool.execute(sql)
        response = {
            result,
            error:0,
        }
        console.log('체크용 ----->',response)
        res.json(response)
    }
    catch(e){
        console.log('/showview',e.message)
    }
}
