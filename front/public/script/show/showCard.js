document.addEventListener('DOMContentLoaded', init)

async function init(e) {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    //오늘의 정보를 알려주는 함수
    let today = new Date()
    let year = today.getFullYear() // 올해
    let month = today.getMonth() // 이번달
    let date = today.getDate() //오늘

    const year_month = document.querySelector('.year-month')
    
    year_month.innerHTML = `${month} ${year}`
    const bigCard = document.querySelector('.bigCard')
    const ulCard = document.querySelector('.ulCard')
    const infoCard = document.querySelector('.infoCard')
    const info = document.querySelector('#info')
    try{
        const response = await axios.post('showCard')
        const infoArr = response.data.result
        infoArr.forEach(v=>{
            let clone = document.importNode(bigCard.content,true)
            const idx = v.show_idx
            let img = clone.querySelector('.imgBox')
            let title = v.show_title
            let content = (v.show_content).replace('\n','<br>')
            console.log(content)
            if(title.includes('박열')){
                img.classList.add('park');
                img.addEventListener('mouseover',()=>{
                    info.innerHTML=content
                })
                img.addEventListener('click',()=>{
                    window.location.href=`http://localhost:3001/show/program/showview/${idx}`
                })
            }else if(title.includes('더데빌')){
                img.classList.add('devil');
                img.addEventListener('mouseover',()=>{
                    info.innerHTML=content
                })
                img.addEventListener('click',()=>{
                    window.location.href=`http://localhost:3001/show/program/showview/${idx}`
                })
            }else if(title.includes('사랑의 끝')){
                img.classList.add('end');
                img.addEventListener('mouseover',()=>{
                    info.innerHTML=content
                })
                img.addEventListener('click',()=>{
                    window.location.href=`http://localhost:3001/show/program/showview/${idx}`
                })
            }else if(title.includes('더모먼트')){
                img.classList.add('moment');
                img.addEventListener('mouseover',()=>{
                    info.innerHTML=content
                })
                img.addEventListener('click',()=>{
                    window.location.href=`http://localhost:3001/show/program/showview/${idx}`
                })
            }else if(title.includes('라이온킹')){
                img.classList.add('lionkiing');
                img.addEventListener('mouseover',()=>{
                    info.innerHTML=content
                })
                img.addEventListener('click',()=>{
                    window.location.href=`http://localhost:3001/show/program/showview/${idx}`
                })
            }else if(title.includes('돈키호테')){
                img.classList.add('donkey');
                img.addEventListener('mouseover',()=>{
                    info.innerHTML=content
                })
                img.addEventListener('click',()=>{
                    window.location.href=`http://localhost:3001/show/program/showview/${idx}`
                })
            }else if(title.includes('라보엠')){
                img.classList.add('laboem');
                img.addEventListener('mouseover',()=>{
                    info.innerHTML=content
                })
                img.addEventListener('click',()=>{
                    window.location.href=`http://localhost:3001/show/program/showview/${idx}`
                })
            }else{
                img.classList.add('default');
                img.addEventListener('mouseover',()=>{
                    info.innerHTML=content
                })
                img.addEventListener('click',()=>{
                    window.location.href=`http://localhost:3001/show/program/showview/${idx}`
                })
            }
            ulCard.appendChild(clone)
            console.log(ulCard)
        })
        const bookBtn = document.querySelector('button')

    }
    catch(e){
        console.log('error')
    }

    // const btnLeft = mainContent.querySelector('.miniBtnL')
    // const btnRight = mainContent.querySelector('.miniBtnR')
    // const prev_arrow = mainContent.querySelector('#prev_arrow')
    // const next_arrow = mainContent.querySelector('#next_arrow')
    // btnLeft.addEventListener('click', btnLeftHandler)
    // btnRight.addEventListener('click', btnRightHandler)
    // prev_arrow.addEventListener('click', btnLeftHandler)
    // next_arrow.addEventListener('click', btnRightHandler)

    const homeBtn = document.querySelector('#logoBox > h1');
    const aboutBtn = document.querySelector('#about');
    const listBtn = document.querySelector('#listBtn')
    const listGrid = document.querySelector('#listGrid')
    const listCalendar = document.querySelector('#listCalendar')
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
    // function btnLeftHandler(){
    //     month-=1
    //     let now = new Date(year,month)
    //     // year_month.innerHTML = `${month} ${year}`
    //     createCalendar(now)
    // }
    // function btnRightHandler(){
    //     month+=1 // 달이 넘어가지 않는 이슈 해결
    //     let now = new Date(year,month)
    //     createCalendar(now)
    // }
}