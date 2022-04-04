document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const img = document.querySelector('.img')
    const summaryTextBox = document.querySelector('.summaryTextBox')
    const summaryTextList = document.querySelectorAll('.summaryText')
    const goViewLink = document.querySelector('.goViewLink')
    

    //예매정보 만들어지면 사용할 버튼
    // for(let i=0; i<summaryTextList.length; i++){
    //     goViewLink.addEventListener('click',()=>{
    //         if(summaryTextList[i].className.search('VIEW')!==-1){
    //             window.location.href= "http://location:3000/show/payment/공연정보"
    //         }
    //     })
    // }

    // 좌우버튼 구현
    for(let i=0; i<summaryTextList.length; i++){
        goViewLink.addEventListener('click',()=>{
            console.log(summaryTextList[i].className)
            if(summaryTextList[i].className.search('front')!==-1){
                summaryTextList[i].className = summaryTextList[i].className.replace('back',"front")
                summaryTextList[i].className = summaryTextList[i].className.replace('VIEW',"HIDDEN")
                summaryTextList[i+1].className = summaryTextList[i+1].className.replace('HIDDEN',"VIEW")
            }else{
                summaryTextList[i].className = summaryTextList[i].className.replace('front',"back")
                summaryTextList[i].className = summaryTextList[i].className.replace('VIEW',"HIDDEN")
                summaryTextList[i+1].className = summaryTextList[i+1].className.replace('HIDDEN',"VIEW")
            }
        })

    }

    let [,,,,idx] = location.pathname.split('/')
    console.log('idx : ',idx)
    try{
        const response = await axios.post(`showview/${idx}`)
        let showResult = response.data.result
        console.log('ishowResultdx : ',showResult)
        console.log(summaryTextList)

        const thElements = document.querySelectorAll('.title')
        const tdElements = document.querySelectorAll('.viewContent')
        
        showViewList(showResult)
        console.log('aaaaa',showResult)

        const leftBtn = document.querySelector('#leftBtn')
        const rightBtn = document.querySelector('#rightBtn')
        const modifyBtn = document.querySelector('.modifyBtn')
        const deleteBtn = document.querySelector('.deleteBtn')
        const goViewList = document.querySelector('.goViewList')

        leftBtn.addEventListener('click',leftBtnHandler)
        rightBtn.addEventListener('click',rightBtnHandler)
        modifyBtn.addEventListener('click',modifyBtnHandler)
        deleteBtn.addEventListener('click',deleteBtnHandler)
        goViewList.addEventListener('click',goListBtnHandler)
        
        async function showViewList(showResult){
            showResult.forEach(v=>{
                let i=0
                
                show_category = getCategory(v.show_category_idx)
                show_xrated = getXrated(v.show_xrated)
                show_date = makeShowTicketDate(v.show_date)
                ticketYear = show_date[0]
                ticketMonth = show_date[1]
                ticketDate = show_date[2]
                showYear = show_date[3]
                showMonth = show_date[4]
                showDate = show_date[5]

                tdElements[i].innerHTML = show_category
                tdElements[i+1].innerHTML = show_xrated
                tdElements[i+2].innerHTML = v.show_title
                tdElements[i+3].innerHTML = `${ticketYear}년 ${ticketMonth}월 ${ticketDate}일 `
                tdElements[i+4].innerHTML = `${showYear}년 ${showMonth}월 ${showDate}일 `
                tdElements[i+5].innerHTML = v.show_place
                tdElements[i+6].innerHTML = v.show_cast1
                tdElements[i+7].innerHTML = v.show_cast2
                tdElements[i+8].innerHTML = v.show_director
                tdElements[i+9].innerHTML = v.show_company
                tdElements[i+10].innerHTML = v.show_content
            })
        }
        
        function makeShowTicketDate(v){
            showSplit = v.split('T')
            showYMD = showSplit[0].split('-')

            showYear = showYMD[0]
            showMonth = showYMD[1]
            showDate = showYMD[2]
            showHour = showSplit[1].slice(0,2)

            let ticketYear = showYear
            let ticketMonth = showMonth
            let ticketDate = showDate

            if(ticketDate - 21 <= 0){
                let restDay = 21 - showDate
                let defaultDay = new Date(showYear,showMonth-1,0)

                ticketDate = defaultDay.getDate()-restDay

                if(showMonth -1 <= 0){
                    ticketMonth = 12
                    ticketYear = ticketYear -1 
                }else{
                    ticketMonth = showMonth - 1
                    console.log(showMonth, ticketMonth)
                }
            } 

            let dateBox = [showYear,showMonth,showDate,ticketYear,ticketMonth,ticketDate]

            return dateBox
        }

        function getCategory(v){
            switch(v){
                case 1 :
                    return show_category = 'musical'
                break;
                case 2 :
                    return show_category = 'concert'
                break;
                case 3 :
                    return how_category = 'classic'
                break;
                case 4 :
                    return show_category = 'ballet'
                break;
                default:
                    console.log('show_category 오류 발생')
                break;
            }
        }


        function getXrated(v){
            switch(v){
                case 1 :
                    return show_xrated = '전체관람가'
                break;
                case 2 :
                    return show_xrated = '청소년'
                break;
                case 3 :
                    return show_xrated = '청소년불가'
                break;
                default:
                    console.log('show_xrated 오류 발생')
                break;
            }
        }

        async function leftBtnHandler(){
            console.log('left')
            try{
                if(idx==1||showResult===none) throw new Error('이전 값 없음')
                idx = idx.replace(idx,String(parseInt(idx)-1))
                location.href = `./${idx}`
            } catch(e){
                console.log(idx)
                alert("마지막 카드입니다.")
            }
        }

        async function rightBtnHandler(){
            try{
                //한정된 카드 정할시 사용
                // if(parseInt(idx)==4) throw new Error('다음 값 없음')
                if(showResult===none||idx===none) throw new Error('다음 값 없음')
                idx = idx.replace(idx,String(parseInt(idx)+1))
                location.href = `./${idx}`
            } catch(e){
                console.log(idx)
                alert("마지막 카드입니다.")
            }
        }

        async function modifyBtnHandler(){
            location.href = `http://localhost:3001/show/program/showmodify/${idx}`
        }

        async function deleteBtnHandler(){
            try{
                let deleteConfirm = confirm('정말 삭제하시겠습니까? 삭제 후 게시글은 다시 복구할 수 없습니다.')
                if(deleteConfirm!==true) throw new Error('삭제 취소')
                location.href = `http://localhost:3001/show/program/showlist`
                const response = await axios.post(`showdelete/${idx}`)
            }
            catch(e){
                console.log('게시글 삭제 취소')
                location.href = `http://localhost:3001/show/program/showview/${idx}`
            }
        }

        async function goListBtnHandler(){
            try{
                location.href = `http://localhost:3001/show/program/showlist`
            }
            catch(e){
                console.log('front / showview / goListBtnHandler 에러발생',e.message)
            }
        }
    }
    catch(e){
        console.log('front / showview에서 에러 발생',e.message)    
    }
}