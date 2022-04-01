let today = new Date()
let year = today.getFullYear()

let result = isLeapYear(2022)
// console.log(result) //일년치의 달력을 모두 반환
console.log(result[0]) //일년치의 달력을 모두 반환
console.log(result[1]) //일년치의 달력을 모두 반환

function isLeapYear(year){
    let result

    if((year % 4 == 0) && ( year % 400 == 0 || year % 100 != 0)===true){
        console.log('윤년입니다')
        result = make_leapYear(year)
    } else{
        console.log('윤년이 아닙니다')
        result = make_NoleapYear(year)
    }
    return result
}

function make_NoleapYear(){
    let calYear = new Array(12)
    let dateNum = [31,28,31,30,31,30,31,31,30,31,30,31] //윤년아님
    
    for(let i=0; i<dateNum.length; i++){
        calYear[i] = new Array(dateNum[i])
    }
    for(let i=0; i<12; i++){
        for(let j=0; j<dateNum[i]; j++){
            calYear[i][j] = j 
        }
    }

    for(let i=0; i<dateNum.length; i++){
        calYear[i] = new Array(dateNum[i])
    }
    
    let sum
    let dateSum = new Array() //월별 누적 날짜 합
    for(let i=0; i<12; i++){
        if(i==0){ //1월일 경우
            sum = 0
        } else { //2월부터
            sum += dateNum[i-1]
        }
        dateSum[i]=sum
    }
    
    //12달
    for(let i=0; i<12; i++){ 
        //31일 || 30일 || 29일(윤년) || 28일
        for(let j=0; j<dateNum[i]; j++){
            //요일 계산
            day = (((((dateSum[i]+1)+j)%7)+5)%7)
    
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
    
            calYear[i][j] = {"month":`${i+1}`, "date":`${j+1}`,"day":`${day}`} 
        }
    }

    return calYear
}


function make_leapYear(){
    let calYear = new Array(12)
    let leapYear = [31,29,31,30,31,30,31,31,30,31,30,31] //윤년

    for(let i=0; i<dateNum.length; i++){
        calYear[i] = new Array(dateNum[i])
    }
    for(let i=0; i<12; i++){
        for(let j=0; j<dateNum[i]; j++){
            calYear[i][j] = j 
        }
    }
    console.log(calYear) //일년치의 달력을 모두 반환

    for(let i=0; i<dateNum.length; i++){
        calYear[i] = new Array(dateNum[i])
    }
    
    let sum
    let dateSum = new Array() //월별 누적 날짜 합
    for(let i=0; i<12; i++){
        if(i==0){ //1월일 경우
            sum = 0
        } else { //2월부터
            sum += dateNum[i-1]
        }
        dateSum[i]=sum
    }
    
    //12달
    for(let i=0; i<12; i++){ 
        //31일 || 30일 || 29일(윤년) || 28일
        for(let j=0; j<dateNum[i]; j++){
            //요일 계산
            day = (((((dateSum[i]+1)+j)%7)+5)%7)
    
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
    
            calYear[i][j] = {"month":`${i+1}`, "date":`${j+1}`,"day":`${day}`} 
        }
    }

    return calYear
}