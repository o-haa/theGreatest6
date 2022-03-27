const pool = require('../../../db')

exports.idCheck = async (req, res) => {
  let response = {
    result: [],
    errno: 1
  }
  const { userId } = req.body
  const prepare = [userId]
  const sql = 'SELECT user_id FROM user where user_id=?'

  try {
    const [[result]] = await pool.execute(sql, prepare)
    if (result !== undefined) throw new Error('아이디 중복')
    response = {
      ...response,
      errno: 0
    }
  } catch (e) {
    console.log(e.message)
  }
  res.json(response)
}

exports.nickNameCheck = async (req, res) => {
  let response = {
    result: [],
    errno: 1
  }
  const {userNickName} = req.body
  const sql = 'SELECT * FROM user WHERE user_nickname = ?'
  const prepare = [userNickName]
  try {
    const [[result]] = await pool.execute(sql, prepare)
    if (result!== undefined) throw new Error('닉네임 중복');
    else {
      response = {
        ...response,
        errno: 0
      }
    }
  } catch (e) {
    console.log(e.message)
  }
  res.json(response)
}




exports.signUp = async (req, res) => {
  let response = {
    result: [],
    errno: 1
  }
  try {
    const { userId, userPw, userNickName } = req.body
    const prepare = [userId, userPw, userNickName]
    const sql = 'INSERT INTO user (user_id,user_password,user_nickname) VALUES (?,?,?)'
    const result = await pool.execute(sql, prepare)
    response = {
      ...response,
      result: result,
      errno: 0
    }
  } catch (e) {
    console.log(e.message, '회원가입 에러 발생')
  }
  res.json(response)
}



exports.signIn = async (req, res) => {
  let response = {
    result: [],
    errno: 1
  }
  const { userPw, userId } = req.body
  const prepare = [userId, userPw]
  const sql = 'SELECT * from USER WHERE user_id = ? AND user_password = ?';
  try {
    const [[result]] = await pool.execute(sql, prepare)
    console.log(userPw)
    console.log(result.user_password)
    console.log(userId)
    console.log(result.user_id)
    if (userPw == result.user_password && userId == result.user_id) {
      delete result.user_password;
      req.cookies = result
      response = {
        ...response,
        result,
        errno: 0
      }
    } else throw new Error('로그인 오류');
  } catch (e) {
    console.log(e.message)
  }
  res.json(response)
}
