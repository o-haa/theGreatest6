document.addEventListener('DOMContentLoaded', init);


async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const tempId = document.querySelector('#userId');
    const mail = document.querySelector('#mail').value;
    const msgIdCheck = document.querySelector('#msgIdCheck');
    msgIdCheck.innerHTML = 'Use 5 - 20 characters with a mix of lowercase letters, numbers & symbols.';

    const msgPwCheck1 = document.querySelector('#msgPwCheck1');
    const msgPwCheck2 = document.querySelector('#msgPwCheck2');
    const userPw = document.querySelector('#userPw');
    const userPwCheck = document.querySelector('#userPwCheck');
    msgPwCheck1.innerHTML = 'Use 8 - 25 characters with a mix of letters, numbers & symbols.';

    const userNickName = document.querySelector('#userNickName');
    const msgNicknameCheck = document.querySelector('#msgNicknameCheck');


    await tempId.addEventListener('keyup',idCheckHanlder);

    async function idCheckHanlder(){
        const userId = tempId.value + mail;
        const data = {
            userId
        };

        if (tempId.value.length < 5) {
            msgIdCheck.innerHTML = 'Use 5 - 20 characters for you ID.';
            throw new Error('아이디 미입력');

        } else {
            try {
                const response = await axios.post('/idcheck', data);
                if (response.data.errno !== 0) {
                    msgIdCheck.innerHTML = 'That userID is taken. Try another.';
                    throw new Error('아이디 중복,');
                };
                msgIdCheck.innerHTML = `${userId} is available ! WELCOME!`;
            } catch (e) {
                console.log(e.message, 'idcheck 에러');
            }
        }
    }

    await userPw.addEventListener('keyup', pwHandler);

    function pwHandler() {
        const length = userPw.value.length;
        if (length >= 1) msgPwCheck1.innerHTML = '';
        if (length < 8) msgPwCheck1.innerHTML = 'Use 8 - 25 characters for your password.';

        if (userPw.value !== userPwCheck.value) msgPwCheck2.innerHTML = 'Confirm your password.';
    }


    await userPwCheck.addEventListener('keyup', pwCheckHandler);

    function pwCheckHandler() {
        if (userPw.value !== userPwCheck.value) msgPwCheck2.innerHTML = 'Confirm your password.';
        else msgPwCheck2.innerHTML = '';
    }


    await userNickName.addEventListener('keyup', nickNameCheckHandler);

    async function nickNameCheckHandler() {
        data = {
            userNickName: userNickName.value
        };
        if (data.userNickName.length < 4) msgNicknameCheck.innerHTML = 'Use 4 - 20 characters for your nickname.';
        else {
            try {
                const response = await axios.post('/nicknamecheck', data);
                const { errno } = response.data;
                if (errno !== 0) throw new Error;
                msgNicknameCheck.innerHTML = `${userNickName.value} is available.`;
            } catch (e) {
                console.log(e.message);
                msgNicknameCheck.innerHTML = 'That usernickname is taken. Try another.';
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
            msgPwCheck1.innerHTML = 'Please choose a stronger password. Try a mix of letters, numbers, and symbols.';
        if (!expId.test(tempId)){
            msgIdCheck.innerHTML = 'Use 5 - 20 characters with a mix of lowercase letters, numbers & symbols.';
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
                const userId = tempId + mail;
                const userNickName = document.querySelector('#userNickName').value;
                console.log(userId, userNickName)
                alert('welcome!');
                location.href='/'
            } catch (e) {
                console.log(e.message);
            }
        }
    }
}