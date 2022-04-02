const pool = require('../../../db');

exports.myinfo = async (req, res) => {
    const { userIdx } = req.body
    const prepare = [ userIdx ]
    const sql = 'SELECT * FROM u_personal WHERE user_idx = ?'

    let response = {
        result: {},
        errno: 1,
    }
    try{
        const [result] = await pool.execute(sql,prepare)
        console.log(result)
        if( result == [] ) throw new Error ('optional value 없음')
        response = {
            result,
            errno: 0
        }
    } catch (e){
        console.log('myinfo 에러', e.message)
    }

    res.json(response);
}

exports.optionalInfo = async(req,res) => {
    console.log(req.body)
    let response = {
        result: {},
        errno: 1
    };
    // const sql ='INSERT INTO u_personal () VALUES ()'
    const prepare = []
    try{
        const result = pool.execute(sql,prepare)
        response = {
            result,
            errno: 0
        }
    }
    catch{

    }

    res.json(response)
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

exports.myAct = (req, res) => {
    res.send('내 활동');

}