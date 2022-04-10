//열 뿌리기
async function getRows() {
    const seatRows = document.querySelectorAll('.seatRow')
    let j = 1
    await seatRows.forEach(v => {
        v.innerHTML = `${j}열`
        j++
    })
}

async function seats() {
    const seats = document.querySelectorAll('#seatInfo .seatTd')
    let i = 7
    await seats.forEach(v => {
        v.value = [i, seatFlag]
        i++
    })

    //좌석 클릭 시 색 변경
    await seats.forEach(v => {
        // console.log(v.value[1])
        v.addEventListener('click', seatHandler)
    })
}


//클릭 시 색상변경
async function seatHandler(e) {
    let seatFlag = e.target.value[1]
    //플래그가 0이면 선택 가능한 상태이며 클릭 시 플래그 1로 변경되며색상 빨강으로 변경
    try {
        if (seatFlag == 1) throw new Error('flag 1인 상태')
        else {
            e.target.style.background = 'brown';
            console.log(seatFlag)
            seatFlag = 1;
            console.log(seatFlag)
        }
    } catch (error) {
        //플래그가 1이라 선택 불가능한 상태이며 클릭 시 플래그 0으로 변경되며 색상 흰색으로 변경 
        e.target.style.background = 'none';
        // seatFlag = 0;
        console.log('hey')
    }
}