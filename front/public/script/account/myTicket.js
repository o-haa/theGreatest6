document.addEventListener('DOMContentLoaded', init);
let user;

//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/management/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    //템플릿
    const tableBox = document.querySelector('#tableBox')

    const checked = document.querySelectorAll('#itemBox input')
    checked.forEach(v => v.addEventListener('click', checkedHandler))

    async function checkedHandler(e) {
        const showMetheScreen = e.target.id
        switch (showMetheScreen) {
            case 'myProfile':
                location.href = '/account/management/myInfo';
                break;
            case 'myCalendar':
                location.href = '/account/management/mycalendar';
                break;
            case 'myBenefit':
                location.href = '/account/management/mybenefit';
                break;
            case 'myPick':
                location.href = '/account/management/mypick';
                break;
            case 'myTicket':
                location.href = '/account/management/myticket';
                break;
        }
    }

    try{
        const response = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
        user = response.data.result.user;

        const userLevel = document.querySelector('#userLevel');
        const userName = document.querySelector('#userName');
        const signOut = document.querySelector('#signOut')


        userLevel.innerHTML = user.user_level;
        userName.innerHTML = user.user_nickname;
        signOut.innerHTML = 'sign out';

        signOut.addEventListener('click',signOutHandler)
        async function signOutHandler(){
            const response = await axios.post('http://localhost:3001/account/member/destroycookie',null)
            console.log(response.data)
        }


    } catch (e){


    }

}