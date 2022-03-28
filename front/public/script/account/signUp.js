document.addEventListener('DOMContentLoaded', init);


async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const tempId = document.querySelector('#userId');
    const mail = document.querySelector('#mail').value;
    const idCheckResult = document.querySelector('#idCheckResult');
    idCheckResult.innerHTML = 'Use 5 - 20 characters with a mix of lowercase letters, numbers & symbols.';

    const pwCheck1 = document.querySelector('#pwCheck1');
    const pwCheck2 = document.querySelector('#pwCheck2');
    const userPw = document.querySelector('#userPw');
    const userPwCheck = document.querySelector('#userPwCheck');
    pwCheck1.innerHTML = 'Use 8 - 25 characters with a mix of letters, numbers & symbols.';

    const userNickName = document.querySelector('#userNickName');
    const nickNameCheckResult = document.querySelector('#nickNameCheckResult');


    await tempId.addEventListener('keyup',idCheckHanlder);

    async function idCheckHanlder(){
        const userId = tempId.value + mail;
        const data = {
            userId
        };

        if (tempId.value.length < 5) {
            idCheckResult.innerHTML = 'Use 5 - 20 characters for you ID.';
            throw new Error('아이디 미입력');

        } else {
            try {
                const response = await axios.post('/idcheck', data);
                if (response.data.errno !== 0) {
                    idCheckResult.innerHTML = 'That userID is taken. Try another.';
                    throw new Error('아이디 중복,');
                };
                idCheckResult.innerHTML = `${userId} is available ! WELCOME!`;
            } catch (e) {
                console.log(e.message, 'idcheck 에러');
            }
        }
    }

    await userPw.addEventListener('keyup', pwHandler);

    function pwHandler() {
        const length = userPw.value.length;
        if (length >= 1) pwCheck1.innerHTML = '';
        if (length < 8) pwCheck1.innerHTML = 'Use 8 - 25 characters for your password.';

        if (userPw.value !== userPwCheck.value) pwCheck2.innerHTML = 'Confirm your password.';
    }


    await userPwCheck.addEventListener('keyup', pwCheckHandler);

    function pwCheckHandler() {
        if (userPw.value !== userPwCheck.value) pwCheck2.innerHTML = 'Confirm your password.';
        else pwCheck2.innerHTML = '';
    }


    await userNickName.addEventListener('keyup', nickNameCheckHandler);

    async function nickNameCheckHandler() {
        data = {
            userNickName: userNickName.value
        };
        if (data.userNickName.length < 4) nickNameCheckResult.innerHTML = 'Use 4 - 20 characters for your nickname.';
        else {
            try {
                const response = await axios.post('/nicknamecheck', data);
                const { errno } = response.data;
                if (errno !== 0) throw new Error;
                nickNameCheckResult.innerHTML = `${userNickName.value} is available.`;
            } catch (e) {
                console.log(e.message);
                nickNameCheckResult.innerHTML = 'That usernickname is taken. Try another.';
            }
        }
    }

    const signUpFrm = document.querySelector('#signUpFrm');
    signUpFrm.addEventListener('submit', submitHanlder);
    async function submitHanlder(e) {
        e.preventDefault();

        const tempId = document.querySelector('#userId').value;
        const mail = document.querySelector('#mail').value;
        const userId = tempId + mail;
        const userPw = document.querySelector('#userPw').value;
        const userNickName = document.querySelector('#userNickName').value;
        const expPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        const expId = /^(?=.*[a-z])(?=.*[0-9]).{5,20}$/;



        if (!expPw.test(userPw)) {
            pwCheck1.innerHTML = 'Please choose a stronger password. Try a mix of letters, numbers, and symbols.';
        if (!expId.test(tempId)){
            idCheckResult.innerHTML = 'Use 5 - 20 characters with a mix of lowercase letters, numbers & symbols.';
        }
        } else {
            const data = {
                userId,
                userPw,
                userNickName
            };
            try {
                const response = await axios.post('/signup', data);
                if (response.data.errno === 1) throw new Error('회원가입 에러');
                alert('welcome!');

            } catch (e) {
                console.log(e.message);
            }
        }
    }
}