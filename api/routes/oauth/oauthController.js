const axios = require('axios');
const kakao_id = process.env.client_id_kakao;
const kakao_secret = process.env.client_secret;
const kakao_uri = process.env.redirect_uri;
const qs = require('querystring');
const { createToken } = require('../../utils/createJWT');

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
        const user = await axios.post('https://kapi.kakao.com/v2/user/me', null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${access_token}`,
            }
        })
        const token = await createToken(user.data);

        await res.cookie('AccessToken', token, {
            path: '/',
            httpOnly: true,
            secure: true,
            domain: 'localhost'
        })
    } catch (e) {
        console.log(e.message);
    }
    res.redirect('http://localhost:3001');
}

