document.addEventListener('DOMContentLoaded', init);


//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials= true;

    try {
        const response = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
        const { user } = response.data.result;
        console.log(user)
        if (user === undefined) throw new Error('로그인 안함');
        const signin = document.querySelector('#signin')
        signin.innerHTML = 'mypage'
        signin.setAttribute('href','/account/management/myinfo')
    }
    catch (e) {
        console.log(e.message)
    }

}