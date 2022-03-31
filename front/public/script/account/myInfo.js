document.addEventListener('DOMContentLoaded', init);


//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials= true;

    const userInfo = document.querySelectorAll('.userInfo');
    console.log(userInfo);
    try {
        const response = await axios.post('http://localhost:3001/account/management/getuserinfo',null)
        console.log(response.data)
    }
    catch (e) { 
        console.log(e);
    }

}

