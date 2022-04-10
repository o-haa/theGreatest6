const pool = require('../../../db');
const sql = require('../../../SQL/queries.js')

let response = {
    result: [],
    errno: 1
}

exports.showWrite = async (req, res) => {
    const { category } = req.body;
    const prepare = [category];
    let categoryIdx;
    try {
        const [[getCategory]] = await pool.execute(sql.getCategory, prepare)
        categoryIdx = getCategory.show_category_idx
    } catch (e){
        console.log('/showWrite getcategory',e.message)
    }

        console.log('req.file : ', req.file) //파일
        console.log('req.body : ', req.body) //텍스트

        let board =[]
        try{
            const {filename} = req.file
            const {subject} = req.body
            const filePath = `http://localhost:4001/${filename}`
            const data = {subject, filePath}
            board.push(data);
            console.log('입력받음 :',board)
            // res.json('ok')
        }catch(e){console.log('에러 : ',e)}
            


        const { xrated, title, place, showCast1, showCast2, showDirector, showCompany, showContent, showMonth, showDate, showHour, ticketMonth, ticketDate, ticketHour } = req.body
        console.log('/write 체크용 ----> req.body', req.body.category)
        //ticket 들어온거 확인함.

        let now = new Date()
        let thisYear = now.getFullYear()

        //timestamp 형식으로 가공하는 함수
        const timestampShow = `${thisYear}-${showMonth}-${showDate} ${showHour}:00`
        const timestampTicket = `${thisYear}-${ticketMonth}-${ticketDate} ${ticketHour}:00`

        if (xrated == '전체관람') xratedIdx = 1;
        if (xrated == '청소년 불가') xratedIdx = 0;

        const prespareShow = [title, categoryIdx, xratedIdx, showCompany, showDirector, timestampTicket, showContent]

        try {
            //쇼 필수 정보 삽입
            const [resultShow] = await pool.execute(sql.showWrite, prespareShow)
            let insertShowId = resultShow.insertId

            //쇼 옵션 정보 삽입
            const prespareOption = [insertShowId, timestampShow, place, showCast1, showCast2]
            const [resultOption] = await pool.execute(sql.showOption, prespareOption)
            let insertOptionId = resultOption.insertId

        //     const fileOriginalname = req.file.originalname;
        //     const fileStoredname = req.file.filename;
        //     const fileSize = req.file.size;
        //     const fileDate = new Date();
        //     const fileDltF = '0'; //이건 무슨 값이지
        //     const fileSql = `INSERT INTO s_file (
        //                                     show_idx,
        //                                     file_originalname,
        //                                     file_storedname,
        //                                     file_size,
        //                                     file_date,
        //                                     file_dlt_flag
        //                                     )
        //                             VALUES(?,?,?,?,?,?)`;
        //     const filePrepare = [insertShowId, fileOriginalname, fileStoredname, fileSize, fileDate, fileDltF];

            // if (req.file.size > 0) {
                // const [resultFile] = await pool.execute(fileSql, filePrepare);

                response = {
                    result: {
                        insertShowId,
                        insertOptionId
                    },
                    errno: 0
                }
            // }
            res.json(response)
        } catch (e) {
            console.log('/showwrite', e)
        }
    }

exports.showList = async (req, res) => {
    try {
        const [result] = await pool.execute(sql.showList)

        response = {
            result,
            error: 0,
        }
        res.json(response)
    }
    catch (e) {
        console.log('/showlist', e.message)
    }

}

exports.showCard = async (req, res) => {
    const sql = `SELECT show_idx, show_title, show_date_open, show_content FROM shows`
    const [result] = await pool.execute(sql)
    response = {
        result,
        error: 0,
    }
    res.json(response)
}

exports.showView = async (req, res) => {
    const { showIdx } = req.params;
    const prepare = [ showIdx ];
    try {
        const [result] = await pool.execute(sql.showView, prepare);
        response = {
            result,
            error: 0,
        };
        res.json(response);
    }
    catch (e) {
        console.log('/showview', e.message);
    }
}

//입력받은 기존 값을 불러오는 라우터
exports.showModifyGetInfo = async (req, res) => {
    const { showIdx } = req.params
    const prepare = [ showIdx ]

    try {
        const [result] = await pool.execute(sql.showView, prepare)
        response = {
            result,
            error: 0
        }
        res.json(response)
    }
    catch (e) {
        console.log(e)
    }
}

//새로 입력받은 값을 update하는 라우터
exports.showModifyView = async (req, res) => {

    const { category } = req.body;
    const prepare1 = [category];
    let categoryIdx;
    try {
        const [[getCategory]] = await pool.execute(sql.getCategory, prepare1)
        categoryIdx = getCategory.show_category_idx
    } catch (e){
        console.log('/showWrite getcategory',e.message)
    }

    let { show_idx, xrated, title, place, showCast1, showCast2, showDirector, showCompany, showContent, timestampShow, timestampTicket } = req.body

const prepare2 = [ show_idx, title, categoryIdx, xrated, showCompany, showDirector,timestampTicket, showContent, timestampShow, place, showCast1, showCast2 ]
    try {
        const [result] = await pool.execute(sql.showUpdate, prepare2)
        response = {
            ...response,
            result,
            show_idx,
            error: 0
        }
        res.json(response)
    }
    catch (e) {
        console.log(e)
    }
    // res.json(response)
}

exports.showDelete = async (req, res) => {
    let { idx } = req.params

    try {
        const sql = `DELETE FROM shows WHERE show_idx='${idx}'`
        const [result] = await pool.execute(sql)
    }
    catch (e) {
        console.log('/showmodify', e.message)
    }
}

exports.showCalendar = async (req, res) => {
    const { year, month, date } = req.body
    let sqlCheck = ``
    if (month < 10) {
        sqlCheck = `SELECT s.show_idx, s.show_title, o.show_place, o.show_date
    FROM shows AS s LEFT JOIN s_option AS o
    ON s.show_idx = o.shows_idx
    WHERE (show_date like "${year}-0${month}%" OR show_date like "${year}-0${month + 1}%")`
    } else if (month + 1 >= 10) {
        sqlCheck = `SELECT s.show_idx, s.show_title, o.show_place, o.show_date
    FROM shows AS s LEFT JOIN s_option AS o
    ON s.show_idx = o.shows_idx
    WHERE (select * from s_option where (show_date like "${year}-0${month}%" OR show_date like "${year}-${month + 1}%"))`
    } else if (month + 1 > 12) {
        month = 1
        sqlCheck = `SELECT s.show_idx, s.show_title, o.show_place, o.show_date
    FROM shows AS s LEFT JOIN s_option AS o
    ON s.show_idx = o.shows_idx
    WHERE (select * from s_option where (show_date like "${year}-0${month}%" OR show_date like "${year}-0${month}%")`
    } else {
        sqlCheck = `SELECT s.show_idx, s.show_title, o.show_place, o.show_date
    FROM shows AS s LEFT JOIN s_option AS o
    ON s.show_idx = o.shows_idx
    WHERE (select * from s_option where (show_date like "${year}-${month}%" OR show_date like "${year}-${month + 1}%")`
    }

    try {
        const [result] = await pool.execute(sqlCheck)
        response = {
            result,
            error: 0,
        }
        res.json(response)
    }
    catch (e) {
        console.log('/showview', e.message);
    }
}

exports.getCategories = async (req, res) => {
    try {
        const [result] = await pool.execute(sql.getFullCategories);
        response = {
            ...response,
            result,
            errno: 0
        }
    } catch (e) {
        console.log('getCategories',e.message);
    }
    res.json(response)
}

exports.ticketOpenDate = async (req,res) =>{
    let response = {
        result: [],
        errno:1
    }
    try{
        const [ result ] = await pool.execute(sql.ticketOpenDate)
        response = {
            result,
            errno:0
        }
    }
    catch (e) {
        console.log('/ticketopendate',e.message)
    }
    console.log(response)
    res.json(response)
}