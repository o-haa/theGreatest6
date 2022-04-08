const pool = require('../../../db');
const { personalInfo } = require('../../../SQL/queries.js');
const sql = require('../../../SQL/queries.js')

exports.myInfo = async (req, res) => {
    const { userIdx } = req.body;
    const prepare = [ userIdx ];

    let response = {
        result: {},
        errno: 1,
    };
    try{
        const [ result ] = await pool.execute(sql.personalInfo,prepare);
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
    let response= {
        result: {},
        errno: 1
    };

    // 모바일
    const { userIdx } = req.body
    const { mobile1 ,mobile2, mobile3 } = req.body.userMobile
    const prepare1 = [ mobile1 ,mobile2, mobile3 ,userIdx]
    try{
        const [ result1 ] = await pool.execute(sql.mobileInfo, prepare1)
        const userMobileIdx = result1.insertId

    //주소
    const {u_add_name, u_add_region1,u_add_region2, u_add_region3, u_add_road, u_add_bd_name,u_add_bd_no,u_add_detail,u_add_zipcode} = req.body.userAddress;
    const prepare2 = [ userIdx, u_add_name, u_add_region1,u_add_region2, u_add_region3, u_add_road, u_add_bd_name,u_add_bd_no,u_add_detail,u_add_zipcode ];

        const [result2] = await pool.execute(sql.addressInfo,prepare2)
        const userAddressIdx = result2.insertId

    // 옵션 정보 입력
    const { userName, userDob, userGender } = req.body;
    const prepare3 = [ userIdx, userName, userDob, userGender, userMobileIdx, userAddressIdx ];

        const result3 = await pool.execute(sql.optionalInfo,prepare3);
        response = {
            result3,
            errno: 0
        };
    }
    catch (e) {
        console.log('/optionalInfo',e.message);
    }
    res.json(response);
}

exports.showUserImg = async (req,res) => {
    
}

exports.insertUserImg = async (req,res) => {
    console.log(req.file)
        
   
    const { originalname, filename, size, encoding, mimetype} = req.file
    const prepare = [ originalname, filename, size ]

    const result = await pool.execute(sql.insertUserImg,prepare)
    
}


exports.updateUserImg = async (req,res) => {

}

exports.deleteUserImg = async (req,res) => {

}





///

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
        const  [result]  = await pool.execute(sql.myBenefit,prepare);
        response = {
            ...response,
            result:result,
            errno: 0
        };
        console.log(result)
    } catch (e){
        console.log('/mybenefit',e.message);
    }
    res.json(response);
}

exports.myAct = (req, res) => {
    res.send('내 활동');

}