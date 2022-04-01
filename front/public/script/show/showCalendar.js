let today = new Date()
let year = today.getFullYear()
let calYear = new Array(12) //12월
 
//윤년 계산법
//년도/4 해서 나누어 떨어지는 해인지 여부(나누어 떨어지면 일단 윤년 O)
//1번에 해당하는 해 중에 년도/100이 또 나누어 떨어지면 윤년 x
//2번에 해당하면서 년도/400이면 윤년 O
function isLeapYear(year){
    if((year % 4 == 0) && ( year % 400 == 0 || year % 100 != 0)===true){
        return [31,29,31,30,31,30,31,31,30,31,30,31]
    } else{
        return [31,28,31,30,31,30,31,31,30,31,30,31]
    }
}

const leapYear = new Array(12)
leapYear[0] = [31,28,31,30,31,30,31,31,30,31,30,31] //윤년아님
leapYear[1] = [31,29,31,30,31,30,31,31,30,31,30,31] //윤년
// console.log(leapYear[0][0]) // 31 : 윤년이 아닌 2022년의 1월의 일수

leapYear[0][0] = new Array(30) //이게 하고 싶음
//... leapYear[0][11]
for(let i=0; i<12; i++){
    if(i == 2){
        leapYear[0][i] = new Array(28) //윤년아닌 2월
    } else if(i%2!=0){
        leapYear[0][i] = new Array(31) //홀수 월
    } else if(i%2==0){
        leapYear[0][i] = new Array(30) //짝수 월
    } else{
        console.log('오류')
    }
}

// console.log(leapYear[0])
console.log((leapYear[0][4]).length) //30개의 공백

leapYear[0][4][0] = 1
console.log(leapYear[0][4][0]) //오!!! 여기에 이제 작성하면 된다!!!!!! 요일을 작성해야하나
//아니네, 요일을 작성하고... 메모를 작성할걸 만들어야하네.. 오..
//아니지, 요일은 계속 변하는거라 배열로 주면 토함
//이걸 변수로 주고, 메모는 다르게 표현해야함. flag 주던가.
//leapYear[0][4][0] class="6", value="메모값 0~4"
//그럼 안에 날짜값 주자
for(let i=0; i<30, i++;){
    leapYear[0][0][i] = i+1
}
//안들어가....
console.log(leapYear[0][4])

//이걸 이제 7등분하자.


// for(let i=0; i<=12; i++){
//     leapYear[0][i] = new Array()
// }

// console.log(leapYear[0]) // 한 해의 한 달에 따른 일수
// console.log(leapYear[0][0]) // 한 해의 한 달에 따른 일수 = 달력생성가능
// console.log(leapYear[0][0][2]) //윤년이 아닌 해의 1월의 3일의 메모여부


// const date = isLeapYear(today) //올해의 윤년 여부에 따른 12달 내의 일수

// for(let i=0; i<12; i++){
//     calYear[i] = new Array(date[i])
// }

// //이 형태는 가능하다는건데
// for(let i=0; i<12; i++){
//     for(let j=0; j<date[i]; j++){
//         calYear[i][j] = j+1;
//     }
// }

// console.log(calYear[0]) //1월의 31일 나옴

//1번 메모 + 2번 메모 표시 규칙
//value 값 주기 = 테이블에서 찾을 컬럼
//생긴 순서대로 primary 값 주기
//1번 ㄴㄴ 2번 ㄴㄴ : 1
//1번 ㅇㅇ 2번 ㄴㄴ : 2
//1번 ㄴㄴ 3번 ㅇㅇ : 3
//1번 ㅇㅇ 3번 ㅇㅇ : 4

//한주짜리 배열을 만들어야함.
//얘는 유동적임
let week = new Array(7)

//요일 구하기
//월-일 : 0 ~ 7
//2022년 1월 1일 토요일 = 6
//2021년 12월 31일 금요일 = 5
// year[m][d][day] = 정보수용
// 예) 1월 1일 = 0일 -> 3월 4일
// [2][4] 0:31 + 1:30 + 4
// 윤년 아님 = 0, 윤년 = 1
//total = year[m].length + year[m+1].length + 4
//day = total % 7 -> 요일
// function getDay(year,calYear,date){
//     let total = 
// }