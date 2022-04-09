document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/book/payment';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;




    const next = document.querySelector('#next')
    next.addEventListener('click',moveToPayment_2Hanlder)

    function moveToPayment_2Hanlder(){
        location.href='/book/payment/payment_1'
    }
}