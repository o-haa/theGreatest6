let seatFlag = 0 ;
let show_idx;
// let dupOccupied = []
// let seatValue = [];
// let occupied = [];


document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/book/book';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    let [,,,,showIdx] = location.pathname.split('/')
    try{
        const response = await axios.post(`/book_1/${showIdx}`)
        show = response.data.result
    } catch (e) {
        console.log(e.message)
    }

//공연 정보
    show_idx = show.show_idx;
    const showTitle = document.querySelector('#showTitle');
    const category = document.querySelector('#category');
    const company = document.querySelector('#company');
    const date = document.querySelector('#date');
    const time = document.querySelector('#time');
    const place = document.querySelector('#place');
    showTitle.innerHTML = show.show_title;
    category.innerHTML = show.show_category;
    company.innerHTML = show.show_company;
    date.innerHTML = show.show_date
    time.innerHTML = show.show_time

    place.innerHTML = show.show_place



    getRows()



    //next 버튼
    const next = document.querySelector('#next')
    next.addEventListener('click',moveToPayment_1Hanlder)
}



async function getRows() {
    const seatRows = document.querySelectorAll('.seatRow')
    let j = 1
    await seatRows.forEach(v => {
        v.innerHTML = `${j}열`
        j++
    })
}




//next 버튼
function moveToPayment_1Hanlder() {
    const row = document.querySelector('#row')
    const number = document.querySelector('#number')
    try {
        const msg = document.querySelector('.msg')
        if (row.value == 0 || number.value  == 0 ) {
            msg.style.display = 'block';
            throw new Error('좌석 정보 미입력');
        }
        console.log(show_idx)
        location.href = `/book/payment/payment_1/${row.value}/${number.value}/${show_idx}`
    } catch (e) {
        console.log('/movetopayment', e.message)
    }
}
