let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/book/payment';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const userInfo = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = userInfo.data.result;

    const bookNumber =  document.querySelector('#bookNumber')
    const showPlace = document.querySelector('#showPlace')
    const showDate = document.querySelector('#showDate')
    const bookSeat = document.querySelector('#bookSeat')

    
    const customer = document.querySelector('#customer')
    const mobile = document.querySelector('#mobile')
    // 닉네임
    customer.innerHTML = user.user_nickname

    const data = {
        userIdx: user.user_idx
    };
try{
    const userPersonallInfo = await axios.post('http://localhost:4001/book/payment/getpersonalinfo', data);
    const mobileNumber = userPersonallInfo.data
    if (mobileNumber.errno === 1) throw new Error ('선택 정보 미입력')
    mobile.innerHTML = mobileNumber

} catch(e) {
    console.log('/getmobilenumber',e.message)
    // alert('선택 정보를 입력해주세요')
    // location.href ='/account/management/myinfo'
}



}