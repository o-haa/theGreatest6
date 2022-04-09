
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    console.log(location.pathname)
    //값 넣을 곳 가지고 오기
    const wNickname = document.querySelector('#wuserNickname');
    const id = document.querySelector('#userId');
    const nickname = document.querySelector('#userNickname');

    //join 정보 가지고 오기
    // const response = await axios.post('/signup')
    // console.log('signup',response)


    //정보 넣어주기
    wNickname.innerHTML = 1
    id.innerHTML = 1
    nickname.innerHTML =1


}