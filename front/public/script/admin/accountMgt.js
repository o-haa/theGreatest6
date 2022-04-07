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

    let i=0
    nodes.forEach(async (v)=>{
        const clone = document.importNode(temp.content,true)
        const tdElement = clone.querySelectorAll('td')
        
        tdElement[i].innerText = v.user_idx
        tdElement[i+1].innerText = v.user_id
        tdElement[i+2].innerText = v.user_nickname
        tdElement[i+3].innerText = v.user_doj
        tdElement[i+4].innerText = v.user_level
        tdElement[i+5].innerText = v.user_active

        const level = clone.querySelector('#level')
        let levelArr = ['1','2','3']
        levelArr.forEach(v=>{
            let optionElement = document.createElement('option')
            optionElement.innerHTML = `${v}`
            level.appendChild(optionElement)
        })

        const active = clone.querySelector('#active')
        let activeArr = ['0','1'] // 활동상태가 1
        activeArr.forEach(v=>{
            let optionElement = document.createElement('option')
            switch(v){
                case 0:
                    optionElement.innerHTML = '활동가능'
                break;
                case 1:
                    optionElement.innerHTML = `활동중지`
                break;
                default:
                    console.log('예외 값 입력')
                break;
            }
            active.appendChild(optionElement)
        })

        tbody.append(clone)
    })

    const btnEdit = document.querySelector('.edit')
    btnEdit.addEventListener('click',btnEditHandler)
    function btnEditHandler(e){
        const event = e.target.parentNode
        console.log(event.parentNode)
        const tdElement = (event.parentNode).querySelectorAll('td')
        console.log(tdElement)
        tdElement[4].setAttribute("class","off")
        tdElement[5].setAttribute("class","off")
        tdElement[6].setAttribute("class","")
        tdElement[7].setAttribute("class","")
        tdElement[8].setAttribute("class","off")
        tdElement[9].setAttribute("class","")
    }

    const btnDone = document.querySelector('.done')
    btnDone.addEventListener('click',btnDoneHandler)
    async function btnDoneHandler(e){
        const event = e.target.parentNode
        const td = (event.parentNode)
        const tdElement = td.querySelectorAll('td')
        console.log(tdElement)
        tdElement[4].setAttribute("class","")
        tdElement[5].setAttribute("class","")
        tdElement[6].setAttribute("class","off")
        tdElement[7].setAttribute("class","off")
        tdElement[8].setAttribute("class","")
        tdElement[9].setAttribute("class","off")

        const level = td.querySelector('#level')
        const active = td.querySelector('#active')
        const idx = tdElement[0].innerText
        const valueLevel = level.value
        const activeLevel = active.value

        const option = {
            valueLevel,
            activeLevel,
            idx
        }
        const response = await axios.post('accountupdate',option)
        window.location.href="http://localhost:3001/admin/account/accountmgt"
    }


}
