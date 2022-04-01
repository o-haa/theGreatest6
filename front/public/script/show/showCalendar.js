let today = new Date()
let year = today.getFullYear()

let result_leapYear = isLeapYear(year)
if(result_leapYear==0){
    make_leapYear() //윤년이 아닌 달을 만드는 함수
} else {
    make_NoleapYear() //윤년인 달을 만드는 함수
}

function isLeapYear(year){
    if((year % 4 == 0) && ( year % 400 == 0 || year % 100 != 0)===true){
        return 0
    } else{
        return 1
    }
}

function make_leapYear(){
    let calYear = new Array(12)
    let dateNum = [31,28,31,30,31,30,31,31,30,31,30,31] //윤년아님
    // console.log(dateNum)
    
    for(let i=0; i<dateNum.length; i++){
        calYear[i] = new Array(dateNum[i])
    }
    for(let i=0; i<12; i++){
        for(let j=0; j<dateNum[i]; j++){
            calYear[i][j] = j 
        }
    }
    console.log(calYear)
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
    console.log(calYear)
}