document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    // 달력기능 복붙
    const showMonth = document.querySelector('.showMonth')
    const showDate = document.querySelector('.showCal')

    // 공연시간(회차)선택
    const showTime = document.querySelector('.showTime')
    
    // 좌석 선택 4*5
    const showSeat = document.querySelector('.showSeat')
    for(let i = 0; i<20; i++){
        const li = document.createElement('li')
        console.log(i) //확인 못하는중
        // showSeat.append(li)
    }

    //최종 예약 정보
    const finalShowInfo = document.querySelector('.finalShowInfo')
}