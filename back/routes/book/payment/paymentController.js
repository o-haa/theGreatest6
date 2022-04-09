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