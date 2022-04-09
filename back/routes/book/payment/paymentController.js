const pool = require('../../../db');
const sql = require('../../../SQL/queries.js')

//결제 수단 정보 불러오기
exports.selectPay = (req,res) => {
    try{

    } catch (e) {
        
    }
}

//결제 수단 정보 입력
exports.insertPay = (req,res) => {

    try{

    } catch (e) {

    }
}

exports.checkPoint = async(req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    const { userIdx } = req.body
    const prepare = [ userIdx ]
    try{
        const [[ result ]] = await pool.execute(sql.checkPoint,prepare)
        response = {
            ...response,
            result: {
                ...result,
                point_net: (result.sum_p_in) - result.sum_p_out
            },
            errno: 0
        }
    } catch (e) {
        console.log('/checkpoint',e.message)
    }
    res.json(response)
}


// 개인정보 조회
exports.getPersonalInfo = async(req,res) => {
    console.log('hey')
    let response = {
        result: {},
        errno:1
    };
    const { userIdx } = req.body
    const prepare = [ userIdx ]
    try{
        const [ result ] = await pool.execute(sql.getPersonalInfo, prepare)
        if(result==false) throw new Error('/정보 미등록')
        response = {
            result,
            errno:0
        };
    } catch (e) {
        console.log('/getpersonalinfo',e.message)
    }
    res.json(response)
}



//포인트 사용하기
exports.usePoint = (req,res) => {
    let response = {
        result: {},
        errno: 1
    }
    try{
        // const result =

        response = {
            result: {},
            errno: 1
        }
    } catch (e) {

    }
}