document.addEventListener('DOMContentLoaded', init)

async function init(e) {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const mainContent = document.querySelector('#mainContent')
    let dates = document.querySelector('.dates')
    let template = document.querySelector('.cal_temp')

    let clone = document.importNode(template.content,true)
    let btnDate = clone.querySelector('.date')
    let dotAdmin = clone.querySelector('.btnAdmin') //admin 일정
    let dotCumstomer = clone.querySelector('.btnCustomer') //user 일정

    //오늘의 정보를 알려주는 함수
    let today = new Date()
    let year = today.getFullYear() // 올해
    let month = today.getMonth() // 이번달
    let date = today.getDate() //오늘

    createCalendar(today)

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
        window.location.href = 'http://localhost:3001/show/program/showcard'; 
    }
    function calBtnHandler(){ 
        window.location.href = '#'; 
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

    function monthThreeWord(v){
        switch(v){
            case 1 :
                return 'JAN'
            break;
            case 2 :
                return 'FEB'
            break;
            case 3 :
                return 'MAR'
            break;
            case 4 :
                return 'APL'
            break;
            case 5 :
                return 'MAY'
            break;
            case 6 :
                return 'JUN'
            break;
            case 7 :
                return 'JUL'
            break;
            case 8 :
                return 'AGU'
            break;
            case 9 :
                return 'SEP'
            break;
            case 10 :
                return 'OCT'
            break;
            case 11 :
                return 'NOV'
            break;
            case 12 :
                return 'DEC'
            break;
            default:
                console.log('calendar month 오류 발생')
            break;
        }
    }

    //달력 그리는 함수
    async function createCalendar(today){
        dates.innerHTML=''

        // 새로 정보를 받아서 사용할 연도/달
        year = today.getFullYear()
        month = today.getMonth()
        date = today.getDate()
        let day

        let prevMonth = new Date(year, month, 0) //저번달 마지막날 정보 객체
        let prevLastDate = prevMonth.getDate()  //저번달 마지막 날
        let prevLastDay = prevMonth.getDay()  //저번달 마지막 요일
        let nowFirstDay = (prevLastDay + 1 == 7 ? prevLastDay = 0 : prevLastDay + 1) //이번달 시작하는 요일

        let nowMonth = new Date(year, month+1, 0) //이번달 마지막날 정보 객체
        let nowLastDate = nowMonth.getDate() //이번달 마지막 말
        let nowLastDay = nowMonth.getDay() //이번달 마지막 요일
        calMonth = monthThreeWord(month+1)

        //이번달이 일요일로 시작하지 않을 경우
        if(nowFirstDay!==0){
            for(let i=(prevLastDate+1) - nowFirstDay; i<=prevLastDate; i++){
                let clone = document.importNode(template.content,true)
                let btnDate = clone.querySelector('.date') //속성 복사
                day = (new Date(year,month-1,i)).getDay() //넣을 날짜 받음
                btnDate.setAttribute("class",`date prev _${year}-${month}-${i}-${day}_0_0`) //value 속성 생성
                btnDate.innerHTML+=i //화면에 띄울 날짜 삽입
                dates.appendChild(clone)
            }
            for(let i=1; i<=nowLastDate; i++){
                let clone = document.importNode(template.content,true)
                let btnDate = clone.querySelector('.date')
                day = (new Date(year,month,i)).getDay()
                btnDate.setAttribute("class",`date _${year}-${month+1}-${i}-${day}_0_0`)
                btnDate.innerHTML+=i
                dates.appendChild(clone)
            }
            for(let i=1; i<=(nowLastDay==6 ? 0 : 6-nowLastDay); i++){
                let clone = document.importNode(template.content,true)
                let btnDate = clone.querySelector('.date')
                day = (new Date(year,month+1,i)).getDay()
                btnDate.setAttribute("class",`date next _${year}-${month+2}-${i}-${day}_0_0`)
                btnDate.innerHTML+=i
                dates.appendChild(clone)
            }
        } else if(nowFirstDay==0){
            for(let i=1; i<=nowLastDate; i++){
                let clone = document.importNode(template.content,true)
                let btnDate = clone.querySelector('.date')
                btnDate.innerHTML+='<div class="date">'+i+'</div>'
                day = (new Date(year,month,i)).getDay()
                btnDate.setAttribute("class",`date _${year}-${month+1}-${i}-${day}_0_0`)
                dates.appendChild(clone)
            }
            for(let i=1; i<=(nowLastDay==6 ? 0 : 6-nowLastDay); i++){
                let clone = document.importNode(template.content,true)
                let btnDate = clone.querySelector('.date')
                btnDate.innerHTML+='<div class="date_next">'+i+'</div>'
                day = (new Date(year,month+1,i)).getDay()
                btnDate.setAttribute("class",`date next _${year}-${month+2}-${i}-${day}_0_0`)
                dates.appendChild(clone)
            }
        }

        makedot(year,month,date)
    }
    
    //일정 그리는 함수
    async function makedot(year,month,date){
        let option={
            year,
            month,
            date
        }
        let response = await axios.post('/showCalendar',option)

        flagAdmin = response.data.result
        flagAdmin.forEach(v=>{
            let show_idx = v.show_idx
            let show_title = v.show_title
            console.log('넌 대체 뭘까',v)
            let dayString = ((new Date(v.show_date)).toLocaleDateString())


            //시간
            let timeString = JSON.stringify((new Date(v.show_date)).toLocaleTimeString()) // 한국기준시간 문자열
            let timeLine = timeString.slice(1,3) //오전,오후 문자열
            let hour = (timeString.slice(4,6)).padStart(2,"0") //시각 문자열
            console.log(hour)
            if(timeLine=='오후'){ hour = `${parseInt(hour)+12}`} //24시 기준 시간표현 문자열
            
            //만약 일정정보가 있다면,
            if(v!==''){
                //4월10일 timestamp에서 날짜만 split
                let showlistRecord = ((v.show_date).split('T'))[0]

                //clone한 li에서 button만 리스트로 가져옴
                const btnList = document.querySelectorAll('.dates > li > button')
                const adminList = document.querySelectorAll('.dates > li > .dot_main')

                let i = 0
                btnList.forEach(v=>{
                    let listName = (btnList[i].className) //날짜에서 가져온 class명
                    let listSplit = ((listName.split('_'))[1]).split('-') //연,월,일,요일

                    year = listSplit[0]
                    month = listSplit[1].padStart(2,"0") //두자리로 만들어주는 함수
                    date = listSplit[2].padStart(2,"0")
                    let listDate = `${year}-${month}-${date}` //연,월,일

                    if(showlistRecord === listDate){ 
                        let adminDot = adminList[i].querySelector('.dotAdmin')
                        adminDot.setAttribute("class","on dotAdmin")

                        adminDot.innerHTML = `<a href="showview/${show_idx}">`+`${hour}시 : `+`${show_title}`+'</a>'
                    }
                    i += 1
                })
            }
        })
    }

}