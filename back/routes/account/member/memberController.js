const {pool} = require('../../../db')

exports.idCheck = async (req,res) =>{
  let response ={
    result:[],
    errono: 1
  }
  try{

  } catch(e){

  }
}


exports.signUp = async(req,res) => {
  let response = {
    result:[],
    errno: 1
  }
  try{
    const { userId,userPw,userNickName } = req.body
    const prepare = [userId, userPw, userNickName]
    const sql = 'INSERT INTO user (user_id,user_password,user_nickname) VALUES (?,?,?)'
    const result = await pool.execute(sql, prepare)

    console.log(result)
    response = {
      ...response,
      result: result,
      errno: 0
    }
  } catch(e){
    console.log(e, '에러 발생')
  }
  res.json(response)
}

exports.signIn = (req,res)=>{
    try{
    
    } catch (e) {
  
    }
}
