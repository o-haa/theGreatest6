document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    //오늘의 정보를 알려주는 함수
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()
    let date = today.getDate()

    //좌우이동 버튼, 연.월 버튼
    const btnLeft = document.querySelector('.btnLeft')
    const btnRight = document.querySelector('.btnRight')
    const year_month = document.querySelector('.year-month')
    let dates = document.querySelector('.dates')
    let template = document.querySelector('.cal_temp')

    //클릭한 좌표 찾기
    const cal_day = document.querySelector('.cal_day')
    cal_day.addEventListener('click',cal_dayHandler)

    function cal_dayHandler(event){
    let alert = event.target
    console.log(alert)
    }

    createCalendar(today)

    //윤년 판단
    function leapYear(leapDate){
        let calYear = new Array(12)
        let dateNum = leapDate

        //선택한 해[달][일]을 만드는 과정
        for(let i=0; i<dateNum.length; i++){
            calYear[i] = new Array(dateNum[i])
        }
        for(let i=0; i<12; i++){
            for(let j=0; j<dateNum[i]; j++){
                calYear[i][j] = j 
            }
        }

        //요일 계산을 위한 월별 누적일수 합
        for(let i=0; i<dateNum.length; i++){
            calYear[i] = new Array(dateNum[i])
        }
        let sum
        let dateSum = new Array()
        for(let i=0; i<12; i++){
            if(i==0){ //1월일 경우
                sum = 0
            } else { //2월부터
                sum += dateNum[i-1]
            }
            dateSum[i]=sum
        }
        
        //날짜별 content안에 들어갈 객체 생성
        //12달
        for(let i=0; i<12; i++){ 
            //31일 || 30일 || 29일(윤년) || 28일
            for(let j=0; j<dateNum[i]; j++){
                //요일 계산
                day = (((((dateSum[i]+1)+j)%7)+5)%7)
                dayNum = day
        
                switch(day){
                    case 0 :
                        day = "일";
                    break;
                    case 1 :
                        day = "월";
                    break;
                    case 2 :
                        day = "화";
                    break;
                    case 3 :
                        day = "수";
                    break;
                    case 4 :
                        day = "목";
                    break;
                    case 5 :
                        day = "금";
                    break;
                    case 6 :
                        day = "토";
                    break;
                }
        
                calYear[i][j] = {"month":`${i+1}`, "date":`${j+1}`,"day":`${day}`,"dayNum":`${dayNum}` } 
            }
        }
        //이 모든 정보를 담은 변수 완성.
        return calYear
    }

    //달력 그리기
    function createCalendar(today){
    dates.innerHTML=''
    let year = today.getFullYear()
    let month = today.getMonth()
    console.log(year,month)
    year_month.innerHTML = `${year}.${month+1}`
    
    let leapDate //초기화 & 선언
    if((year % 4 == 0) && ( year % 400 == 0 || year % 100 != 0)===true){
        console.log('윤년입니다')
        leapDate = [31,28,31,30,31,30,31,31,30,31,30,31]
    } else{
        console.log('윤년이 아닙니다')
        leapDate = [31,29,31,30,31,30,31,31,30,31,30,31] //윤년
    }

    let result //초기화 & 선언
    result = leapYear(leapDate)

    let clone = document.importNode(template.content,true)
    let btnDate = clone.querySelector('.date')
    let dotAdmin = clone.querySelector('.btnAdmin')
    let dotCumstomer = clone.querySelector('.btnCustomer')

    let thisMonth = result[month]
    let prevMonth = result[month-1]

    let prevLastDate = prevMonth.length  //저번달 마지막 날
    let nowFirstDay = thisMonth[0].dayNum //이번달 첫요일
    let nowLastDate = thisMonth.length //이번달 마지막날
    let nowLastDay = thisMonth[nowLastDate-1].dayNum //이번달 마지막 요일

    //이번달이 일요일로 시작하지 않을 경우
    if(nowFirstDay!==0){
        for(let i=(prevLastDate+1) - nowFirstDay; i<=prevLastDate; i++){
        let clone = document.importNode(template.content,true)
        let btnDate = clone.querySelector('.date')
        btnDate.innerHTML+='<div class="date prev">'+i+'</div>'
        btnDate.value = `result[${month-1}][${i-1}]`
        dates.appendChild(clone)
        }
        for(let i=1; i<=nowLastDate; i++){
        let clone = document.importNode(template.content,true)
        let btnDate = clone.querySelector('.date')
        btnDate.innerHTML+='<div class="date">'+i+'</div>'
        btnDate.value = `result[${month}][${i-1}]`
        dates.appendChild(clone)
        }
        for(let i=1; i<(nowLastDay==6 ? 0 : 6-nowLastDay); i++){
        let clone = document.importNode(template.content,true)
        let btnDate = clone.querySelector('.date')
        btnDate.innerHTML += '<div class="date next">'+i+'</div>'
        btnDate.value = `result[${month+1}][${i-1}]`
        dates.appendChild(clone)
        }
    } else {
        for(let i=1; i<=nowLastDate; i++){
        let clone = document.importNode(template.content,true)
        let btnDate = clone.querySelector('.date')
        btnDate.innerHTML+='<div class="date">'+i+'</div>'
        btnDate.value = `result[${month}][${i-1}]`
        dates.appendChild(clone)
        }
        for(let i=1; i<(nowLastDay==6 ? 0 : 6-nowLastDay); i++){
        let clone = document.importNode(template.content,true)
        let btnDate = clone.querySelector('.date')
        btnDate.innerHTML+='<div class="date_next">'+i+'</div>'
        btnDate.value = `result[${month+1}][${i-1}]`
        dates.appendChild(clone)
        }
    }
    }

    btnLeft.addEventListener('click', btnLeftHandler)
    btnRight.addEventListener('click', btnRightHandler)

    function btnLeftHandler(){
    let now = new Date(year,month-1)
    console.log(now)
    createCalendar(now)
    }

    function btnRightHandler(){
    let now = new Date(year,month+1)
    console.log(now)
    createCalendar(now)
    }
}