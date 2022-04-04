const pool = require('../../../db');

exports.myinfo = async (req, res) => {
    const { userIdx } = req.body;
    const prepare = [ userIdx ];
    const sql = `SELECT 
                    u_name, 
                    DATE_FORMAT(u_dob, '%Y-%m-%d') AS u_dob,
                    u_gender,
                    u_mobile,
                    u_address_idx
                FROM u_personal 
                WHERE user_idx = ?`;

    let response = {
        result: {},
        errno: 1,
    };
    try{
        const [ result ] = await pool.execute(sql,prepare);
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
    const sql ='INSERT INTO u_personal (user_idx, u_name, u_dob, u_gender, u_mobile) VALUES (?,?,?,?,?)';
    const prepare = [ userIdx, userName, userDob, userGender, userMobile ];
    try{
        const result = pool.execute(sql,prepare);
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

exports.myAct = (req, res) => {
    res.send('내 활동');

}