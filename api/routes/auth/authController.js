const axios = require('axios');
const kakao_id = process.env.client_id_kakao;
const kakao_secret = process.env.client_secret;
const kakao_uri = process.env.redirect_uri;
const qs = require('querystring');


exports.kakao = async (req, res) => {
    const { code } = req.query;
    const option = {
        'grant_type': 'authorization_code',
        'client_id': kakao_id,
        'redirect_uri': kakao_uri,
        'client_secret': kakao_secret,
        code
    };
    try {
        const response = await axios.post('https://kauth.kakao.com/oauth/token', qs.stringify(option), {
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        const { access_token, token_type, refresh_token } = response.data;
        console.log(access_token, token_type, refresh_token);
        const user = await axios.post('https://kapi.kakao.com/v2/user/me', null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${access_token}`,
            }
        })
        console.log(user.data);
        //유저 데이터 가져와서 처리해야함-내일 할 예정
        // const user = await axios.post('http://localhost:3001',)
    } catch (e) {
        console.log(e.message);
    }
    res.render('kakao.html');
}

