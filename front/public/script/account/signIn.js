document.addEventListener('DOMContentLoaded', init)


//인잇
function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/member/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const signInFrm = document.querySelector('#signInFrm')

    signInFrm.addEventListener('submit', signUpHandler)
    async function signUpHandler(e) {
        e.preventDefault()
        const userId = document.querySelector('#signInId').value
        const userPw = document.querySelector('#signInPw').value

        const data = {
            userId,
            userPw
        }
        try {
            const response = await axios.post('/signIn', data)
            const errno = response.data.errno
            if (errno !== 0) throw new Error;
            console.log('로그인됨')
        } catch (e) {
            console.log(e)
        }
    }
}