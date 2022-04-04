const pool = require('../../../db.js')

let response = {
    result:[],
    errno:1
}

exports.showWrite = async (req,res)=>{
    // console.log('req.file : ',req.file) //파일
    // console.log('req.body : ',req.body) //텍스트

    const {category, xrated, title, place, showCast1, showCast2, showDirector,showCompany,showContent,showMonth,showDate,showHour} = req.body
    //show_idx 필요함

    let now = new Date()
    let thisYear = now.getFullYear()

    const sqlShow = `INSERT INTO shows(
        show_title,
        show_category_idx,
        show_xrated,
        show_company,
        show_director,
        show_like,
        show_content,
        show_open_flag
        )VALUES(?,?,?,?,?,'0',?,'0')`

    const prespareShow = [title,category, xrated,showCompany,showDirector,showContent]
    const timestamp = `${thisYear}-${showMonth}-${showDate} ${showHour}:00`
    const sqlOption = `INSERT
        INTO s_option(shows_idx, show_date, show_place, show_cast1, show_cast2)
        VALUES (?,?,?,?,?)`

    try{
        const [resultShow] = await pool.execute(sqlShow,prespareShow)
        let insertShowId = resultShow.insertId
        console.log(insertShowId)

        const prespareOption = [insertShowId, timestamp, place, showCast1, showCast2]
        const [resultOption] = await pool.execute(sqlOption,prespareOption)
        let insertOptionId = resultOption.insertId
        console.log('insertOptionId --> ',insertOptionId)

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
            console.log('resultFile --> ',resultFile)

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
        console.log('back / showwrite',e.message)
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
        console.log("back / showlist 에러발생")
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
    console.log(idx)
    const sql = `SELECT s.show_idx, s.show_title, s.show_category_idx, s.show_xrated, s.show_company, s.show_director, s.show_content, o.show_date, o.show_place, o.show_cast1, o.show_cast2 
    FROM shows AS s LEFT JOIN s_option AS o ON s.show_idx = o.shows_idx
    WHERE s.show_idx=${idx} `

    try{
        const [result] = await pool.execute(sql)
        response = {
            result,
            error:0,
        }
        console.log('체크용 ----->',response)
        res.json(response)
    }
    catch(e){
        console.log("back / showview 에러발생")
    }
}

exports.showModify = async (req,res)=>{
    console.log('back / showModify 라우터 접속!')
    const {idx} = req.params
    console.log(idx)
    
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
        console.log("back / showmodify 에러발생", e.message)
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
        console.log("back / showview 에러발생",e.message)
    }
}