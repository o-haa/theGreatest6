const axios = require('axios')

exports.getUserInfo = async (req,res) => {
    axios.defaults.baseURL = 'http://localhost:4001/account/member';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const { AccessToken } = req.cookies;
    const data = {
        AccessToken
    };
    let response = {
        errno: 1,
        result : {}
    }
    try {
        if (AccessToken === undefined) throw new Error('토큰 없음, 로그인 페이지로 가랏');
        const result = await axios.post('/auth', data);
        response = {
            errno: 0,
            result : result.data
        }
    } catch (e) {
        console.log('/getuserinfo',e.message);
    }
    res.json(response)
}

exports.myInfo = (req, res) => {
    res.render('./account/myInfo');
}

exports.myTicket = (req, res) => {
    res.render('./account/myTicket');

}

exports.myPick = (req, res) => {
    res.render('./account/myPick');

}

exports.myCalendar = (req, res) => {
    res.render('./account/myCalendar');

}

exports.myAct = (req, res) => {
    res.render('./account/myAct');
}

exports.myBenefit = (req, res) => {
    res.render('./account/myBenefit');
}