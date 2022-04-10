const pool = require('../../../db');
const sql = require ('../../../SQL/queries')

let response = {
    result:[],
    errno:1
};

//회원 관리하는 페이지
exports.accountMgt = async (req,res) =>{
    const sql = `SELECT
                        user_id,
                        user_password,
                        user_nickname,
                        user_level,
                        user_active,
                        user_idx,
                        user_doj
                FROM user
                ORDER BY user_idx DESC`
    try{
        const [result] = await pool.execute(sql);
        // console.log(result)

        response = {
            ...response,
            result,
            errno:0
        }
    } catch (e) {
        console.log(e.message);
    }
    res.json(response)
}

exports.accountUpdate = async (req,res) =>{
    const {valueLevel, activeLevel, idx} = req.body
    const sql = `UPDATE user
                SET user_level=${valueLevel}, user_active=${activeLevel}
                WHERE user_idx=${idx}
                `
    const [result] = await pool.execute(sql)
    res.json(result)
}

//포인트 추가 페이지
exports.insertPoint = async (req,res) =>{
    let response = {
        result: {},
        errno: 1
    };
    const { userIdx, pointIn, pointOut, pointDescription} = req.body;
    const prepare =  [ userIdx, pointIn, pointOut, pointDescription];
    try { 
        const [result] = await pool.execute(sql.insertPoint, prepare);
        response = {
            ...response,
            result: {
                affectedRows: result.affectedRows,
                insertId: result.insertId
            },
            errno: 0
        };
    } catch (e) {
        console.log('/insertPoint',e.message);
    }
    res.json(response);
}


//포인트 수정
exports.updatePoint = async (req,res) =>{
    let response = {
        result: {},
        errno: 1
    };
    const { pointIdx, pointIn, pointOut, pointDescription } = req.body;
    const prepare =  [ pointIn, pointOut, pointDescription, pointIdx ];

    try { 
        const [ result ] = await pool.execute( sql.updatePoint, prepare );
        response = {
            result,
            errno: 0
        };
    } catch (e) {
        console.log('/updatePoint',e.message);
    }
    res.json(response);
}

exports.deletePoint = async (req,res) =>{
    let response = {
        result: {},
        errno: 1
    };
    const { pointIdx } = req.body;
    const prepare =  [ pointIdx ];
    console.log(prepare)

    try { 
        const [ result ] = await pool.execute( sql.deletePoint, prepare );
        response = {
            result,
            errno: 0
        };
        console.log(result);
    } catch (e) {
        console.log('/deletePoint',e.message);
    }
    res.json(response);
}