document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    console.log('front 도착!')

    let [,,,,idx]=location.pathname.split('/') // /show/program/showview/2
    const response = await axios.post(`showview/${idx}`)
    //1)요청전달 4) 값을 받음
    let result= response.data.result

    const ul = document.querySelector('#viewList')
    const span = ul.querySelectorAll('li span:nth-child(2)') //배열

    showViewList(result)

    async function showViewList(result){
        result.forEach(v=>{
            let i=0
            span[i].innerHTML = v.show_idx
            span[i+1].innerHTML = v.show_category
            span[i+2].innerHTML = v.show_xrated
            span[i+3].innerHTML = v.show_title
            span[i+4].innerHTML = v.show_company
            span[i+5].innerHTML = v.show_director
        })
    }


    // 한 화면에 보이는 값은 idx=1 작품
    // 화살표를 누를때마다 url은 변한다
    const leftBtn = document.querySelector('#leftBtn')
    const rightBtn = document.querySelector('#rightBtn')
    leftBtn.addEventListener('click',leftBtnHandler)
    rightBtn.addEventListener('click',rightBtnHandler)
    
    async function leftBtnHandler(){
        console.log('left')
        try{
            if(idx==1) throw new Error('이전 값 없음')
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
            idx = idx.replace(idx,String(parseInt(idx)+1))
            location.href = `./${idx}`
        } catch(e){
            console.log(idx)
            alert("마지막 카드입니다.")
        }
    }

}