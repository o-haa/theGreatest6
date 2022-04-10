const pool = require('../../../db');
const sql = require('../../../SQL/queries.js')
let response = {
    result: {},
    errno: 1
};

exports.book_1 = async (req,res) => {
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

exports.InsertBookInfo = async (req,res) => {
    const prepare = [ ]

    try{
        const [ result ] = await pool.execute( '/insertBookInfo', prepare)

    } catch (e) {

    }
}

exports.seatInfo = async (req,res) => {
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
    const { seatIdx } = req.body;
    const prepare = [ seatIdx ];
    console.log(seatIdx);
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