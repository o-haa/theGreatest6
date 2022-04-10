document.addEventListener('DOMContentLoaded', init)

async function init() {

    //관리자 레벨 2가 아닐경우 작성불가
    // const resinfo = await axios.post('http://localhost:3001/account/management/getuserinfo',null)
    // const userinfo = resinfo.data.result.user
    // if(userinfo.user_level>2){
    //     const writeBtn = document.querySelector('#writeBtn > a')
    //     writeBtn.setAttribute("class","notAllow")
    // }

    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response = await axios.post('showlist')
    const Nodes = response.data.result
    
    let trElement = document.querySelector('#showList_row');
    let trInner = document.querySelector('#showList_row').innerHTML;
    const tbody = document.querySelector("table > tbody")

    console.log(Nodes)

    let template=''
    Nodes.forEach(v=>{
        const clone = document.importNode(trElement.content,true)
        let tdElement = clone.querySelectorAll('td')
        const aElement = document.createElement('a')
        aElement.setAttribute(`href`,`showview/${v.show_idx}`)
        aElement.innerHTML = v.show_title

        switch(v.show_xrated){
            case 1: v.show_xrated = '전체관람'
                    break;
            case 0: v.show_xrated = '청소년 불가'
                    break;
        }
        
        tdElement[0].innerHTML = v.show_idx
        tdElement[1].innerHTML = v.show_category
        tdElement[2].innerHTML = v.show_xrated
        tdElement[3].innerHTML = ''
        tdElement[3].append(aElement)
        tdElement[4].innerHTML = "관리자"
        
        tbody.append(clone)
        
        template += trInner.replace('{show_idx}',v.show_idx)
                            .replace('{show_title}',v.show_title)
                            .replace('{show_category_idx}',v.show_category_idx)
                            .replace('{show_xrated}',v.show_xrated)
    })


    //좌우이동 버튼, 연.월 버튼
    const btnLeft = document.querySelector('.btnLeft_small')
    const btnRight = document.querySelector('.btnRight_small')
    const prev_arrow = document.querySelector('#prev_arrow')
    const next_arrow = document.querySelector('#next_arrow')

    const homeBtn = document.querySelector('#home');
    const aboutBtn = document.querySelector('#about');
    const listBtn = document.querySelector('#listBtn')
    const listGrid = document.querySelector('#listGrid')
    const listCalendar = document.querySelector('#listCalendar')


    btnLeft.addEventListener('click', btnLeftHandler)
    prev_arrow.addEventListener('click',btnLeftHandler)
    btnRight.addEventListener('click', btnRightHandler)
    next_arrow.addEventListener('click',btnRightHandler)
    
    homeBtn.addEventListener('click', moveHome)
    aboutBtn.addEventListener('click', moveAbout)
    listBtn.addEventListener('click', listBtnHandler)
    listGrid.addEventListener('click', gridBtnHandler)
    listCalendar.addEventListener('click', calBtnHandler)

    function listBtnHandler(){ 
        window.location.href = '#'; 
    }
    function gridBtnHandler(){ 
        window.location.href = 'http://localhost:3001/show/program/showcard'; 
    }
    function calBtnHandler(){ 
        window.location.href = 'http://localhost:3001/show/program/showcalendar'; 
    }
    function moveHome(){ 
        window.location.href = 'http://localhost:3001/'; 
    }
    function moveAbout(){
        window.location.href = 'http://localhost:3001/about';
    }
    function btnLeftHandler(){
        month-=1
        let now = new Date(year,month)
        createCalendar(now)
    }
    function btnRightHandler(){
        month+=1 // 달이 넘어가지 않는 이슈 해결
        let now = new Date(year,month)
        createCalendar(now)
    }
}