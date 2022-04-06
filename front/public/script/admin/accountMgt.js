document.addEventListener('DOMContentLoaded', init);
let user;

//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/admin/account/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;
}