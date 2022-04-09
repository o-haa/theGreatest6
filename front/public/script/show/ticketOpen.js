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


    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const response = await axios.post('ticketopendate')
    let nodes = response.data.result
    
    const temp = document.querySelector('#adminList_row')
    const tbody = document.querySelector('tbody')

    let i = 0
    let j = 1
    nodes.forEach(async (v)=>{
        const clone = document.importNode(temp.content,true)
        const tdElement = clone.querySelectorAll('td')
        const title = clone.querySelector('.title')
        
        tdElement[i].innerText = j
        tdElement[i+1].innerText = v.show_title
        tdElement[i+2].innerText = v.show_company
        tdElement[i+3].innerText = v.show_date_open

        title.addEventListener('click',goToView)

        tbody.append(clone)
        j+=1
    })

    async function goToView(e){
        const titleTxt = (e.target).innerText
        switch(titleTxt){
            case '박열':
                window.location.href="/"
            break;
            case '박열':
                window.location.href="/"
            break;
            case '박열':
                window.location.href="/"
            break;
            case '박열':
                window.location.href="/"
            break;
            default:
                window.location.href="/"
            break;
            
        }
    }
}
