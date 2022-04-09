let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/book/payment';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const userInfo = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = userInfo.data.result;


// 예매 정보 1
    const bookNumber = document.querySelector('#bookNumber')
    const showPlace = document.querySelector('#showPlace')
    const showDate = document.querySelector('#showDate')
    const bookSeat = document.querySelector('#bookSeat')

    bookNumber.innerHTML = `T${Date.now()}`
    try {
        data = {
            showIdx
        }
        const showInfo = axios.post(`http://localhost:4001/show/program/showview${showIdx}`)
        console.log(showInfo)
    } catch (e) {
        console.log('/showInfo', e.message)
    }




//예매 정보 2 - 예매자 정보
    const customer = document.querySelector('#customer')
    const mobile = document.querySelector('#mobile')

    const data = {
        userIdx: user.user_idx
    };
    try {
        const userPersonallInfo = await axios.post('http://localhost:4001/book/payment/getpersonalinfo', data);
        const userInfo = userPersonallInfo.data.result

        if (userInfo.errno === 1) throw new Error('선택 정보 미입력')
        customer.innerHTML = userInfo.u_name
        mobile.innerHTML = userInfo.u_mobile

    } catch (e) {
        console.log('/getpersonalinfo', e.message)
        // alert('선택 정보를 입력해주세요')
        // location.href ='/account/management/myinfo'
    }


// 결제 정보


// 결제 상세 정보
    getDeadLine()
}


const getDeadLine = _=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${year}년 ${month}월 ${day}일 11시59분`
    const deadLine = document.querySelector('#deadLine')
    deadLine.innerHTML = today
    return today;

}