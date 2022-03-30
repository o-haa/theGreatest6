const axios = require('axios')

// exports.auth = (req, res, next) => {
//     const { AccessToken } = req.cookies;
//     try {
//         if ( AccessToken === undefined ) throw new Error ('토큰 없음, 로그인 페이지로 가랏');
//         const response = await axios.post('/auth', data);
//         next();
//     } catch (e) {
//         console.log(e.message);
//         res.render('account/signIn');
//     }
// }


exports.auth = async (req, res, next) => {
    axios.defaults.baseURL = 'http://localhost:4001/account/member';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const { AccessToken } = req.cookies;
    const data = {
        AccessToken
    };
    if (AccessToken === undefined) throw new Error('토큰 없음, 로그인 페이지로 가랏');
    else {
        try {
            const response = await axios.post('/auth', data);
            const { user }= response.data;
            next();
        } catch (e) {
            console.log(e.message);
        }
    }
}