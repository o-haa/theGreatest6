const pool = require('../../../db');
const sql = require('../../../SQL/queries.js')


exports.book_1 = async (req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    const { showIdx } = req.params
    const prepare = [ showIdx ]
    try{
        const [[ result ]] = await pool.execute(sql.book_1, prepare );
        const [ date, time ] = result.show_date.split(' ')
        response = {
            result:{
                ...result,
                show_date: date,
                show_time: time
            },
            errno: 0
        };
    } catch (e) {
        console.log(e);
    }
    res.json(response)
}

exports.insertBookInfo = async (req, res) => {
    let response = {
        result: {},
        errno: 1
    };
    const { seatIdx, showIdx, userIdx, bookNum } = req.body;
    const prepare = [seatIdx, showIdx, new String(userIdx), bookNum];
    console.log(prepare)
    try {
        const [result] = await pool.execute('/insertBookInfo', prepare);
        response = {
            ...response,
            result: {
                affectedRows: result.affectedRows,
                inserId: result.insertId
            },
        };
        console.log(result)
    } catch (e) {
        console.log('/insertbookinfo ', e.message)
    }
    res.json(response)
}

exports.seatInfo = async (req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    try{
        const result = await pool.execute(sql.seatInfo)
        response = {
            result,
            errno: 0,
        }
    } catch (e) {
        console.log('/selectseatinfo',e.message)
    }
    res.json(response)
}

exports.seatflaginfo = async (req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    const { seatIdx } = req.body;
    const prepare = [ seatIdx ];
    try{
        const result = await pool.execute(sql.seatFlagInfo,prepare);
        response = {
            ...response,
            result,
            errno:0
        };
    } catch (e) {
        console.log('/seatflaginfo',e.message);
    }
    res.json(response);
}