document.addEventListener('DOMContentLoaded', init)


async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const idCheckBtn = document.querySelector('#idCheckBtn')

    const pwCheck1 = document.querySelector('#pwCheck1')
    const pwCheck2 = document.querySelector('#pwCheck2')
    const userPw = document.querySelector('#userPw')
    const userPwCheck = document.querySelector('#userPwCheck')
    pwCheck1.innerHTML = 'Use 8 - 25 characters with a mix of letters, numbers & symbols'

    const userNickName = document.querySelector('#userNickName')
    const nickNameCheckResult = document.querySelector('#nickNameCheckResult')



    await idCheckBtn.addEventListener('click', clickHandler)

    async function clickHandler() {

        const tempId = document.querySelector('#userId').value
        const mail = document.querySelector('#mail').value
        const userId = tempId + mail
        const idCheckResult = document.querySelector('#idCheckResult')

        const data = {
            userId
        }

        try {
            const response = await axios.post('/idcheck', data)
            if (!tempId) {
                idCheckResult.innerHTML = 'You can use letters and numbers'
                throw new Error('아이디 미입력')
            }
            else if (response.data.errno !== 0) {
                idCheckResult.innerHTML = 'That userID is taken. Try another'
                throw new Error('아이디 중복,');
            };
            idCheckResult.innerHTML = `${userId} is available`
        } catch (e) {
            console.log(e.message, 'idcheck 에러')
        }
    }


    await userPw.addEventListener('keyup', pwHandler)

    function pwHandler(e) {
        const length = userPw.value.length
        if (length >= 1) pwCheck1.innerHTML = '';
        if (length < 8) pwCheck1.innerHTML = 'Use 8 - 25 characters for your password';

        if (userPw.value !== userPwCheck.value) pwCheck2.innerHTML = 'Confirm your password.';
    }


    await userPwCheck.addEventListener('keyup', pwCheckHandler)

    function pwCheckHandler() {
        if (userPw.value !== userPwCheck.value) pwCheck2.innerHTML = 'Confirm your password.';
        else pwCheck2.innerHTML = '';
    }


    await userNickName.addEventListener('keyup', nickNameCheckHandler)

    async function nickNameCheckHandler() {
        data = {
            userNickName: userNickName.value
        }
        if (!data.userNickName) nickNameCheckResult.innerHTML = 'your nickname must contain 2 - 20 characters.';
        else if (data.userNickName.length < 2) nickNameCheckResult.innerHTML = 'your nickname must contain 4 - 20 characters.';
        else {
            try {
                const response = await axios.post('/nicknamecheck', data)
                console.log(response.data)
                const { errno } = response.data
                if (errno !== 0) throw new Error;
                nickNameCheckResult.innerHTML = `${userNickName.value} is available.`
            } catch (e) {
                console.log(e.message)
                nickNameCheckResult.innerHTML = 'That usernickname is taken. Try another'
            }
        }
    }

    const signUpFrm = document.querySelector('#signUpFrm')
    signUpFrm.addEventListener('submit', submitHanlder)
    async function submitHanlder(e) {
        e.preventDefault()

        const tempId = document.querySelector('#userId').value
        const mail = document.querySelector('#mail').value
        const userId = tempId + mail
        const userPw = document.querySelector('#userPw').value
        const userNickName = document.querySelector('#userNickName').value
        const exp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if (!exp.test(userPw)) {
            pwCheck1.innerHTML = 'Please choose a stronger password. Try a mix of letters, numbers, and symbols.';
        } else {
            const data = {
                userId,
                userPw,
                userNickName
            }
            try {
                const response = await axios.post('/signup', data)
                if (response.data.errno === 1) throw new Error('회원가입 에러');
                alert('회원 가입이 완료 되었습니다')

            } catch (e) {
                console.log(e.message)
            }
        }
    }
}