document.addEventListener('DOMContentLoaded', init);


//인잇
function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials= true;

    const signInFrm = document.querySelector('#signInFrm');

    signInFrm.addEventListener('submit', signUpHandler);
    async function signUpHandler(e) {
        e.preventDefault();
        const tempId = document.querySelector('#tempId').value;
        const usermail = document.querySelector('#mail').value;
        const userPw = document.querySelector('#signInPw').value;
        const userId = tempId+usermail;
        const msg = document.querySelector('#msg');
        const data = {
            userId,
            userPw
        };

        if (!tempId) { 
            msg.innerHTML = 'please enter a valid email.';
            throw new Error('아이디 공란');
        } else {
            try {
                const response = await axios.post('/signIn', data);
                const errno = response.data.errno;
                if (errno !== 0) throw new Error;
                console.log('로그인됨');
            } catch (e) {
                console.log(e.message);
            }
        }
    }
}