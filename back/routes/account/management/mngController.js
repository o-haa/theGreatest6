const pool = require('../../../db');
const sql = require('../../../SQL/queries.js')

exports.myInfo = async (req, res) => {
    const { userIdx } = req.body;
    const prepare = [ userIdx ];

    let response = {
        result: {},
        errno: 1,
    };
    try{
        const [ result ] = await pool.execute(sql.myInfo,prepare);
        if( result == 0 ) throw new Error ('optional value 없음');
        response = {
            result,
            errno: 0
        };
    } catch (e){
        console.log('/myinfo', e.message);
    }
    res.json(response);
}

exports.optionalInfo = async(req,res) => {
    let response = {
        result: {},
        errno: 1
    };

    const { userIdx, userName, userDob, userGender, userMobile, userAddress } = req.body;
    const prepare = [ userIdx, userName, userDob, userGender, userMobile ];
    try{
        const result = pool.execute(sql.optionalInfo,prepare);
        response = {
            result,
            errno: 0
        };
    }
    catch{
        console.log('/optionalInfo',e.message);
    }
    res.json(response);
}


exports.myTicket = (req, res) => {
    res.send('내 티켓');

}

exports.myPic = (req, res) => {
    res.send('내 픽');

}

exports.myCalendar = (req, res) => {
    res.send('내 달력');
}

exports.myBenefit = async (req, res) => {
    let response = {
        result : {},
        errno: 1
    };
    try{
        const prepare = [req.body.userIdx];
        const [ result ] = await pool.execute(sql.myBenefit,prepare);
        console.log(result);
        response = {
            ...response,
            result,
            errno: 0
        };
    } catch (e){
        console.log('/mybenefit',e.message);
    }
    res.json(response);
}

exports.myAct = (req, res) => {
    res.send('내 활동');

}