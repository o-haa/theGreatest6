let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/book/payment';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const userInfo = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = userInfo.data.result;

    const answer = document.querySelectorAll('.answer input');
    const yes = document.querySelector('#yes');
    const pointCheckBox = document.querySelector('#pointCheckBox');

    answer.forEach(v =>v.addEventListener('click', clickHandler));

    //클릭 시 포인트 사용 여부 체크
    function clickHandler() {
        if (yes.checked) {
            pointCheckBox.style.display = 'block';
        } else {
            pointCheckBox.style.display = 'none';
        }
    }

    //클릭 시 포인트 조회
    pointCheckBtn.addEventListener('click',pointCheckBtnhandler);
    async function pointCheckBtnhandler(){
        const usablePoint = document.querySelector('#usablePoint');
        const data = {
            userIdx: user.user_idx
        };
        const response = await axios.post('/checkPoint',data);
        const point = response.data.result.point_net;
        usablePoint.innerHTML = point;

    }

    //입금 계좌 정보
    const bank = document.querySelector('#bank')
    getbankInfo()




    //티켓 가격 및 입금 마감 기한
    const ticketPrice = document.querySelector('#ticketPrice')
    try {
        // const response = await axios.post('/payment_1',)
    } catch (e) {
        console.log('/payment_1',e.message)
    }
    ticketPrice.innerHTML = '1000'
    getDeadLine()
    


    const next = document.querySelector('#next')
    next.addEventListener('click',moveToPayment_2Hanlder)

    function moveToPayment_2Hanlder(){
        location.href='/book/payment/payment_2'
    }
}


async function getbankInfo() {
    try {
        const bankInfo = await axios.post('/getFullBankInfo', null)
        const account = bankInfo.data.result

        let option
        await account.forEach(v => {
            option = document.createElement('option')
            option.value = v.bank_account;
            option.innerHTML = v.bank_account;
            bank.appendChild(option);
        })

    } catch (e) {
        console.log('/payment_1 getbankinfo', e.message)
    }
}


const getDeadLine = _=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${year}년 ${month}월 ${day}일 23시 59분`
    const deadLine = document.querySelector('#deadLine')
    deadLine.innerHTML = today
    return today;
}