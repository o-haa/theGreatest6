document.addEventListener('DOMContentLoaded', init);
let user;

//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/management/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    //템플릿
    const tableBox = document.querySelector('#tableBox');
    const requiredOn = document.querySelector('#requiredOn')  //필수 정보
    const whiteBlock = document.querySelector('#prevent')   //블로킹
    const userOptionFrm = document.querySelector('#optionalOff')    //유저 선택 정보 없는 경우
    const optionalBox = document.querySelector('#optionalOn')  //유저 선택 정보 있는 경우
    const benefitOn = document.querySelector('#benefitOn')

    const checked = document.querySelectorAll('#itemBox input');
    checked.forEach(v => v.addEventListener('click', checkedHandler));

    async function checkedHandler(e) {
        const showMetheScreen = e.target.id;
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

        //유저 정보 불러와서 렌더하기
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


        //포인트 정보 불러와서 렌더하기
        const tbody = document.querySelector('tbody');
        const potintTable = document.querySelector('#pointTable');
        const pointRows = document.importNode(potintTable.content,true);
        const pointRow = pointRows.querySelectorAll('.pointRow')
        tbody.appendChild(pointRows);

        const data = {
            userIdx : user.user_idx
        };
        const responseBenefit = await axios.post('/mybenefit',data);
        if(responseBenefit.data.errno !==0 )throw new Error;
        const point = responseBenefit.data.result;
        point.forEach(v=>{
            pointRow[0] = '';       //인덱스...개개인의 거래 인덱스?
            pointRow[1].innerHTML = v.u_point_date
            pointRow[2].innerHTML = v.u_point_description
            pointRow[3].innerHTML = v.u_point_in
            pointRow[4].innerHTML = v.u_point_out
            pointRow[5].innerHTML = v.u_point_net  
            return pointRow;
        })
    } catch (e){
        console.log('/mybenefit',e.message);

    }

}