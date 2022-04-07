document.addEventListener('DOMContentLoaded', init);
let user;

//인잇
async function init() {

    // //관리자 레벨 2가 아닐경우 작성불가
    // const resinfo = await axios.post('http://localhost:3001/account/management/getuserinfo',null)
    // const userinfo = resinfo.data.result.user
    // if(userinfo.user_level>2){
    //     const writeBtn = document.querySelector('#writeBtn > a')
    //     writeBtn.setAttribute("class","notAllow")
    // }

    
    axios.defaults.baseURL = 'http://localhost:4001/admin/account/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const response = await axios.post('accountmgt')
    let nodes = response.data.result
    
    const temp = document.querySelector('#adminList_row')
    

    const tbody = document.querySelector('tbody')
    const newOption = document.createElement('option')

    let i = 0
    
}
