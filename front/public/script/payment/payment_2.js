let [, , , , seatIdx, showIdx, bankIdx, pointOut] = location.pathname.split('/')
let user;

document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/book/payment';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const userInfo = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    user = userInfo.data.result.user;
    userIdx= user.user_idx;

    //예매 버튼
    const book = document.querySelector('#book')

    // 예매 정보 1 관련 변수
    const bookNumber = document.querySelector('#bookNumber')
    const showPlace = document.querySelector('#showPlace')
    const showDate = document.querySelector('#showDate')
    const showTitle = document.querySelector('#showTitle')
    const bookSeat = document.querySelector('#bookSeat')

    //예매 번호
    const bookNum = `T${Date.now()}`
    bookNumber.innerHTML = bookNum

    //예매정보 1 - 공연 정보
    try {
        const showInfo = await axios.post(`http://localhost:4001/book/book/book_1/${showIdx}`)
        const show = showInfo.data.result
        showPlace.innerHTML = show.show_place
        showDate.innerHTML = show.show_date
        showTitle.innerHTML = show.show_title


    } catch (e) {
        console.log('/showInfo', e.message)
    }


    //예매 정보 2 - 예매자 정보
    const customer = document.querySelector('#customer')
    const mobile = document.querySelector('#mobile')

    const data = {
        userIdx
    };
    try {
        const userPersonallInfo = await axios.post('http://localhost:4001/book/payment/getpersonalinfo', data);
        if (userPersonallInfo.data.errno === 1) throw new Error('선택 정보 미입력');
        const userInfo = userPersonallInfo.data.result
        customer.innerHTML = userInfo.u_name
        mobile.innerHTML = userInfo.u_mobile

    } catch (e) {
        console.log('/getpersonalinfo', e.message)
        alert('선택 정보를 입력해주세요')
        // location.href ='/account/management/myinfo'
    }

    //좌석 및 가격 정보
    // 결제 정보 및 결제 상세 정보
    const fee = document.querySelector('#fee');
    const ticketPrice = document.querySelector('#ticketPrice');
    const totalPrice = document.querySelector('#totalPrice');

    try {
        const seatInfo = await axios.post(`http://localhost:4001/book/payment/getspecificseatfromidx/${seatIdx}`);
        const seat = seatInfo.data.result
        bookSeat.innerHTML = `1층 ${seat.book_seat_row}열 ${seat.book_seat_number}번 `
        let ticketprice = seat.book_seat_price
        ticketPrice.innerHTML = seat.book_seat_price
        fee.innerHTML = ticketprice*0.05
        totalPrice.innerHTML = `${ticketprice*1.05 - pointOut} [포인트 차감]`

    } catch (e) {
        console.log('/payment_2 getseatinfo', e)
    }
    getDeadLine()
    getbankInfo()


    book.addEventListener('click',bookHandler)

    //예매 db
    async function bookHandler(){
        const data = {
            seatIdx,
            showIdx,
            userIdx,
            bookNum,
        }
        try{
            const inserBookInfo = await axios.post('http://localhost:4001/book/book/insertbookinfo',data)
            console.log(inserBookInfo.data)
        } catch (e) {
            console.log('/payment_2 insertbookinfo',e.message)
        }

    }


}


const getDeadLine = _ => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${year}년 ${month}월 ${day}일 23시 59분`
    const deadLine = document.querySelector('#deadLine')
    deadLine.innerHTML = today
    return today;
}


async function getbankInfo() {
    try {
        const bankInfo = await axios.post(`/getBankInfo/${bankIdx}`)
        const account = bankInfo.data.result.bank_account;
        const number = bankInfo.data.result.bank_number;
        bankAccount.innerHTML = `${account}: ${number}`

    } catch (e) {
        console.log('/payment_2 getbankinfo', e.message)
    }
}
