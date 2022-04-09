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

    const ticketPrice = document.querySelector('#ticketPrice')
    const deadLine = document.querySelector('#deadLine')
    try {
        // const response = await axios.post('/payment_1',)
    } catch (e) {
        console.log('/payment_1',e.message)
    }
    ticketPrice.innerHTML = '1000'
    deadLine.innerHTML = '2022-02-02 PM 23:59'
    



    const next = document.querySelector('#next')
    next.addEventListener('click',moveToPayment_2Hanlder)

    function moveToPayment_2Hanlder(){
        location.href='/book/payment/payment_2'
    }
}
