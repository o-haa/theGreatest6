const pool = require('../../../db');
const sql = require('../../../SQL/queries.js');


//결제 수단 정보 불러오기
exports.getFullBankInfo = async (req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    try{
        const [result] = await pool.execute(sql.getFullBankInfo);
        response = {
            ...response,
            result,
            errno: 0
        };
    } catch (e) {
        console.log('/getbankinfo',e.message);
    }
    res.json(response);
}


//선택 결제 수단 불러오기
exports.getBankInfo = async (req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    const { bankIdx } = req.params
    const prepare = [ bankIdx ]
    try{
        const [[ result ]] = await pool.execute(sql.getBankInfo,prepare);
        response = {
            ...response,
            result,
            errno: 0
        };
    } catch (e) {
        console.log('/getbankinfo',e.message);
    }
    res.json(response);
}



exports.checkPoint = async(req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    const { userIdx } = req.body;
    const prepare = [ userIdx ];
    try{
        const [[ result ]] = await pool.execute(sql.checkPoint,prepare);
        response = {
            ...response,
            result: {
                ...result,
                point_net: (result.sum_p_in) - result.sum_p_out
            },
            errno: 0
        };
    } catch (e) {
        console.log('/checkpoint',e.message);
    }
    res.json(response);
}


// 개인정보 조회
exports.getPersonalInfo = async(req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    const { userIdx } = req.body;
    const prepare = [ userIdx ];
    try{
        const [[ result ]] = await pool.execute(sql.getPersonalInfo, prepare);
        if(result.user_idx==null) throw new Error('/정보 미등록');
        response = {
            ...response,
            result: {
                ...result,
                u_mobile: `${result.u_mobile1} - ${result.u_mobile2} - ${result.u_mobile3} `
            },
            errno:0
        };
    } catch (e) {
        console.log('/getpersonalinfo',e.message);
    }
    res.json(response);
}



//포인트 사용하기
exports.getSpecificSeat = async (req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    const { rowIdx, numberIdx } = req.body;
    prepare = [ rowIdx, numberIdx ];
    try{
        const [[ result ]] = await pool.execute(sql.getSpecificSeat, prepare);
        response = {
            result,
            errno: 0
        };
    } catch (e) {
        console.log('/getspecificseat',e.message);
    }
    res.json(response);
}


exports.getSpecificSeatFromIdx = async (req,res) =>{
    let response = {
        result: {},
        errno: 1
    };
    try{
        const { seatIdx } = req.params
        const prepare = [ seatIdx ]
        const [[ result ]] = await pool.execute(sql.getSpecificSeatFromIdx,prepare)
        response = {
            result,
            errno:0
        }
    } catch (e) {
        console.log(e.message)
    }
    res.json(response)
}