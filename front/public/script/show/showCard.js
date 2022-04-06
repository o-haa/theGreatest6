document.addEventListener('DOMContentLoaded', init)

async function init(e) {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';;
    const year_month = document.querySelector('.year-month')

    const response = await axios.post('showCard')
    console.log(response)
    console.log("접속")

    year_month.innerHTML = `${calMonth} ${year}`

    const liElement = document.querySelector()
    let clone = document.importNode(template.content,true)
    // 작품갯수 먼저 다 채우고 거기에 링크 걸어서 갯수만큼 자동으로 생성하게 만들기
    let img = clone.querySelector('imgBox')


    const btnLeft = mainContent.querySelector('.miniBtnL')
    const btnRight = mainContent.querySelector('.miniBtnR')
    const homeBtn = document.querySelector('#home');
    const aboutBtn = document.querySelector('#about');
    const listBtn = document.querySelector('#listBtn')
    const listGrid = document.querySelector('#listGrid')
    const listCalendar = document.querySelector('#listCalendar')

    btnLeft.addEventListener('click', btnLeftHandler)
    btnRight.addEventListener('click', btnRightHandler)
    homeBtn.addEventListener('click', moveHome)
    aboutBtn.addEventListener('click', moveAbout)
    listBtn.addEventListener('click', listBtnHandler)
    listGrid.addEventListener('click', gridBtnHandler)
    listCalendar.addEventListener('click', calBtnHandler)

    function listBtnHandler(){ 
        window.location.href = 'http://localhost:3001/show/program/showlist'; 
    }
    function gridBtnHandler(){ 
        window.location.href = '#'; 
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