document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
    // 아이디 중복체크

    const idCheckBtn = document.querySelector('#idCheck')
    idCheckBtn.addEventListener('click', clickHandler)

    async function clickHandler(){

    const tempId = document.querySelector('#userId').value
    const mail = document.querySelector('#mail').value

    const data = {
        tempId,
        mail
    }

        try {
            const response = axios.post('/idcheck', data)
        } catch (e) {

        }
    }




    // 회원가입
    const signUpFrm = document.querySelector('#signUpFrm')
    signUpFrm.addEventListener('submit', submitHanlder)

    async function submitHanlder(e) {
        e.preventDefault()
        const tempId = document.querySelector('#userId').value
        const userPw = document.querySelector('#userPw').value
        const userPwCheck = document.querySelector('#userPwCheck').value
        const userNickName = document.querySelector('#userNickName').value
        const mail = document.querySelector('#mail').value
        const userId = tempId + mail
        const data = {
            userId,
            userPw,
            userNickName
        }

        try {
            const response = await axios.post('/signup', data)
            if (response.data.errno === 1) throw new Error('signUp errno : 1')
        } catch (e) {
            console.log(e.message)
        }
    }
}