document.addEventListener('DOMContentLoaded', init);

let response = {
    result:[],
    errno:1
}

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/admin/show/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
    const catListB = document.querySelector('.beforeBox > .catList')
    const catListA = document.querySelector('.afterBox > .catList')
    const temp = document.querySelector('template')
    const responseGet = await axios.post('categorymgt')

    //리스트를 만들 자료 resCat
    let resCat = responseGet.data 
    makebefore(resCat, catListB)
    makeafter()

    const newCat = document.querySelector('.newCat')
    let cats = [];
    let id = 0;

    //수정 전 리스트
    function makebefore(resCat, catList){
        resCat.forEach(v=>{
            const clone = document.importNode(temp.content,true)
            const catName = clone.querySelector('.catName')
            catName.innerHTML = `${v.show_category}`
            const del = clone.querySelector('button')
            del.addEventListener('click',catDelet)
            catList.append(clone)
        })
    }

    //수정 후 리스트
    function makeafter(){
        makebefore(resCat, catListA)
        const catLi = document.querySelectorAll('.afterBox > .catList > li')
        for(let i=2; i<catLi.length; i++){
            catLi[i].addEventListener('dblclick',(e)=>{
                const etarget = e.target //<div class="className"></>
                const einput = e.target.innerHTML //ballet   
                const catInput = document.createElement('input')
                catInput.value = einput
                catInput.classList.add('edit-input'); //class에 추가
                catLi[i].innerHTML = '<input class="edit-input">'+'</input>'
                catLi[i].addEventListener('keypress', catModify)
            })
            console.log(i)
        }
    }

    newCat.addEventListener("keydown",catAdd)

    function catAdd(e){
        const ul = document.querySelector('.afterBox > .catList')
        if(e.key === 'Enter'){
            const newCat = document.querySelector('.newCat')
            const clone = document.importNode(temp.content,true)
            const catName = clone.querySelector('.catName')
            catName.innerHTML = newCat.value
            ul.appendChild(clone)
            newCat.innerHTML=''
        }
    }
    
    function catModify(e){
        if(e.key === 'Enter') {
            const checkbox = document.querySelector('.checkbox')
            const catName = document.querySelector('.catName')
            const delBtn = document.querySelector('.delBtn')
            catName.innerHTML = `${e.target.value}`
            const parent = e.target.parentNode
            e.target.parentNode.innerHTML=''
            parent.append(checkbox)
            parent.append(catName)
            parent.append(delBtn)
        }else{
            
        }
    }

    const delBtn = document.querySelector('.delBtn')
    delBtn.addEventListener('click',catDelet)

    function catDelet(e){
        const delt = e.target.parentNode
        delt.remove()
        const catLi = document.querySelectorAll('.afterBox > .catList > li')
        console.log(catLi)
    }

    const btnFin = document.querySelector('.btnBox > button')
    btnFin.addEventListener('click',submitHandelr)
    
    async function submitHandelr(){
        const catLi = document.querySelectorAll('.afterBox > .catList > li > .catName')
        const arr = []
        let j
        for(let i=0; i<catLi.length; i++){
            arr.push(catLi[i].innerHTML)
            console.log(catLi[i].innerHTML)
        }
        console.log('arr ----> ',arr)
        //sql을 바꿀 코드
        const response = await axios.post('categorysave',arr)
        console.log(response)
    }
}