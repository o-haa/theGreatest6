document.addEventListener('DOMContentLoaded', init);


//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials= true;

    const requiredInfo = document.querySelectorAll('.infoValue');
    try {
        const response = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
        const { user } = response.data.result;
        console.log(user);

        requiredInfo[0].innerHTML = user.user_id
        requiredInfo[1].innerHTML = user.user_nickname
        requiredInfo[2].innerHTML = user.user_doj
        requiredInfo[3].innerHTML = user.user_level

        

    }
    catch (e) {
        console.log(e);
    }

}

