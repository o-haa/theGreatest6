const pool = require('../../../db');
const { createToken, createSignature } = require('../../../utils/createJWT')
const sql = require('../../../SQL/queries')

exports.idCheck = async (req, res) => {
  let response = {
    result: [],
    errno: 1
  };
  const { userId } = req.body;
  const prepare = [userId];

  try {
    const [[result]] = await pool.execute(sql.idCheck, prepare);
    if (result !== undefined) throw new Error('아이디 중복');
    response = {
      ...response,
      errno: 0
    };
  } catch (e) {
    console.log('/idcheck',e.message);
  }
  res.json(response);
}

exports.nickNameCheck = async (req, res) => {
  let response = {
    result: [],
    errno: 1
  };
  const {userNickName} = req.body;
  const prepare = [userNickName];
  try {
    const [[result]] = await pool.execute(sql.NickNameCheck, prepare);
    if (result!== undefined) throw new Error('닉네임 중복');
    else {
      response = {
        ...response,
        errno: 0
      };
    }
  } catch (e) {
    console.log('/nicknamecheck',e.message);
  }
  res.json(response);
}




exports.signUp = async (req, res) => {
  let response = {
    result: [],
    errno: 1
  };
  try {
    const { userId, userPw, userNickName } = req.body;
    const prepare = [userId, userPw, userNickName];
    const result = await pool.execute(sql.signUp, prepare);
    response = {
      ...response,
      result: result,
      errno: 0
    };
  } catch (e) {
    console.log('/signup',e.message);
  }
  res.json(response);
}



exports.signIn = async (req, res) => {
  let response = {
    result: [],
    errno: 1
  };
  const { userPw, userId } = req.body;
  const prepare = [userId, userPw];

  try {
    const [[result]] = await pool.execute(sql.signIn, prepare);
    if (userPw !== result.user_password || userId !== result.user_id) throw new Error('로그인 오류');
    delete result.user_password
    const token = await createToken(result);
    res.cookie('AccessToken', token, {
      path: '/',
      httpOnly: true,
      secure: true,
      domain: 'localhost'
    })
    response = {
      ...response,
      result,
      errno: 0
    };
  } catch (e) {
    console.log('/signin',e.message);
  }
  res.json(response);
}


exports.auth = async (req, res) => {
  const { AccessToken } = req.body;
  let response = {
    errno: 1,
    user: {},
  };
  try {
    const [header, payload, sign] = await AccessToken.split('.');
    const signature = await createSignature(header, payload);
    if (sign !== signature) throw new Error('토큰 불일치');
    const user = await JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    response = {
      errno: 0,
      user,
    }
  }
  catch (e) {
    console.log('/auth',e.message);
  }
  res.json(response);
}
