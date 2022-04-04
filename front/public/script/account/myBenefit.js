document.addEventListener('DOMContentLoaded', init);
let user;

//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/management/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    //템플릿
    const tableBox = document.querySelector('#tableBox')
    const requiredOn = document.querySelector('#requiredOn')  //필수 정보
    const whiteBlock = document.querySelector('#prevent')   //블로킹
    const userOptionFrm = document.querySelector('#optionalOff')    //유저 선택 정보 없는 경우
    const optionalBox = document.querySelector('#optionalOn')  //유저 선택 정보 있는 경우
    const benefitOn = document.querySelector('#benefitOn')

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
                // myPick()
                location.href = '/account/management/mypick';
                break;
            case 'myTicket':
                // myTicket()
                location.href = '/account/management/myticket';
                break;
        }
    }

    try{
        const response = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
        user = response.data.result.user;

        const userLevel = document.querySelector('#userLevel');
        const userName = document.querySelector('#userName');
        userLevel.innerHTML = user.user_level;
        userName.innerHTML = user.user_nickname;

    } catch (e){


    }

}