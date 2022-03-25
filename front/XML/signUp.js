document.addEventListener('DOMContentLoaded',init)
    
function init(){
    axios.defaults.baseURL = 'http://localhost:4001';
    console.log(`회원 가입 페이지`)
}