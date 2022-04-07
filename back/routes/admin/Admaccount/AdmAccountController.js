const pool = require('../../../db');

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
        console.log(result)

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

//혜택 관리하는 페이지
exports.benefitMgt = (req,res) =>{
    res.send('어드민 혜택 관리')

}