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
    console.log('show_idx : ',idx)
    try{
        const response = await axios.post(`showview/${idx}`)
        let showResult = response.data.result
        
        const thElements = document.querySelectorAll('.title')
        const tdElements = document.querySelectorAll('.viewContent')
        
        showViewList(showResult)

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
        
        console.log(showResult)

        async function showViewList(showResult){
            showResult.forEach(v=>{
                let i=0

                switch(v.show_xrated){
                    case 1: v.show_xrated = '전체관람'
                            break;
                    case 0: v.show_xrated = '청소년 불가'
                            break;
                }

                show_category = v.show_category
                show_xrated = v.show_xrated
                show_date_open = makeDate(v.show_date_open) //예매일
                show_date = makeDate(v.show_date) //공연일

                ticketYear = show_date_open[0]
                ticketMonth = show_date_open[1]
                ticketDate = show_date_open[2]
                showYear = show_date[0]
                showMonth = show_date[1]
                showDate = show_date[2]

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

        const bookBtn = document.querySelector('#book')
        bookBtn.addEventListener('click', bookBtnHandler)

        async function bookBtnHandler(){
            location.href=`/book/book/book_1/${idx}`
        }


        
        //날짜 분리해주는 함수
        function makeDate(v){
            stringSplit = v.split('T')
            YMD = stringSplit[0].split('-')
            year = YMD[0]
            month = YMD[1]
            date = YMD[2]
            hour = stringSplit[1].slice(0,2)
            let list = [year,month,date,hour]

            return list
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
            try{
                location.href = `http://localhost:3001/show/program/showmodify/${idx}`
            }
            catch(e){
                console.log('/showmodify',e.message)
            }
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
                console.log('/showview/goListBtnHandler',e.message)
            }
        }
    }
    catch(e){
        console.log('/showview',e.message)    
    }
}
