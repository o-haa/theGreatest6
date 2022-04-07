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
    let result = response.data.result
    
    const temp = document.querySelector('#adminList_row')
    const clone = document.importNode(temp.content,true)
    const tdElement = clone.querySelectorAll('td')
    console.log('---------> ',tdElement)

    let i = 0
    result.forEach(v=>{
        i+=1
        tdElement[i].innerHtml = v.user_idx
        tdElement[i+1].innerHtml = v.user_id
        tdElement[i+2].innerHtml = v.user_nickname
        tdElement[i+3].innerHtml = v.user_doj
        tdElement[i+4].innerHtml = v.user_level
        tdElement[i+5].innerHtml = v.user_active
    })  
}
