const axios = require('axios')

exports.auth = async (req, res, next) => {
    axios.defaults.baseURL = 'http://localhost:4001/account/member';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const { AccessToken } = req.cookies;
    const data = {
        AccessToken,
    };
    try {
        if (AccessToken === undefined) throw new Error('토큰 없음, 로그인 페이지로 가랏');
        const response = await axios.post('/auth', data);
        next();
    } catch (e) {
        console.log('/auth',e.message);
        res.render('account/signIn');
    }
}


exports.levelCheck = async (req, res, next) => {
    axios.defaults.baseURL = 'http://localhost:4001/account/member';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const { AccessToken } = req.cookies;
    const data = {
        AccessToken,
    };
    try {
        if (AccessToken === undefined) throw new Error('토큰 없음, 로그인 페이지로 가랏');
        const response = await axios.post('/auth', data);
        if (response.data.user.user_level>2) throw new Error('관리자 아님, 메인 페이지로 가세요');
        next();
    } catch (e) {
        console.log('/levelcheck',e.message);
        res.render('index');
    }
}