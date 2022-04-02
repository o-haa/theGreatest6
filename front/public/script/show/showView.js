document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const leftBtn = document.querySelector('#leftBtn')
    const rightBtn = document.querySelector('#rightBtn')
    const modifyBtn = document.querySelector('#modifyBtn')
    const deleteBtn = document.querySelector('#deleteBtn')
    const goListBtn = document.querySelector('#goList')

    leftBtn.addEventListener('click',leftBtnHandler)
    rightBtn.addEventListener('click',rightBtnHandler)
    modifyBtn.addEventListener('click',modifyBtnHandler)
    deleteBtn.addEventListener('click',deleteBtnHandler)
    goListBtn.addEventListener('click',goListBtnHandler)

    let [,,,,idx] = location.pathname.split('/')
    const response = await axios.post(`showview/${idx}`)
    let result = response.data.result

    const ul = document.querySelector('#viewList')
    const span = ul.querySelectorAll('li span:nth-child(2)')

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

        }
    }
}