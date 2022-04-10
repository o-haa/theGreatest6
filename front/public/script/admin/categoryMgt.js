// const pool = require("../../../../back/db");

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
    console.log('data 가져오기',resCat)
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


    let inputFlag = false

    //수정 후 리스트
    function makeafter(){
        makebefore(resCat, catListA)
        const catLi = document.querySelectorAll('.afterBox > .catList > li')
        catLi.forEach(v=>{
            v.addEventListener('dblclick',(e)=>{
                inputFlag = true
                const etarget = e.target
                const einput = e.target.value
                const idx = etarget.getAttribute('value')//value 값 가져오기                
                const catInput = document.createElement('input')//input 생성
                catInput.value = einput //입력한 값을 저장
                catInput.classList.add('edit-input'); //class에 추가

                console.log(v)
                const checkbox = v.querySelector('.checkbox')
                const catName = v.querySelector('.catName')
                const delBtn = v.querySelector('.delBtn')
                checkbox.setAttribute("class","off")
                catName.setAttribute("class","off")
                delBtn.setAttribute("class","off")
                v.append(catInput)
                v.addEventListener('keypress', catModify) 

                async function catModify(e){
                    if(e.key === 'Enter') {
                        const catInput = document.querySelector('.edit-input')
                        console.log(catInput.value)
                        const orig = catName.innerHTML
                        catName.innerHTML = catInput.value
                        const value = catInput.value

                        option = {
                            value,
                            orig,
                        }
                        const responseModify = await axios.post('/categorymodify',option)

                        catInput.remove()
                        checkbox.setAttribute("class","checkbox")
                        catName.setAttribute("class","catName")
                        delBtn.setAttribute("class","delBtn")
                    }
                }
            })        
        })
    }

    // document.addEventListener('click',function(e){
    //     if(inputFlag == true){ //입력 상태일때
    //         const inputBox = document.querySelector('input')
    //         if(e.target.id != 'inputBox'){ //e.target이 input이 아니면
    //             nav.classList.remove('input');
    //             return gnbSlide = false;
    //         }
    //     }
    // })


    newCat.addEventListener("keydown",catAdd)

    async function catAdd(e){
        const ul = document.querySelector('.afterBox > .catList')
        if(e.key === 'Enter'){
            const newCat = document.querySelector('.newCat')
            const clone = document.importNode(temp.content,true)
            const catName = clone.querySelector('.catName')
            catName.innerHTML = newCat.value
            result = newCat.value

            option ={result}
            const responseAdd = await axios.post('/categoryadd',option)
            
            ul.appendChild(clone)
            newCat.innerHTML=''
            catName.setAttribute("value",`${responseAdd.data.insertId}`)
            console.log(responseAdd.data.insertId)
        }
    }

    const delBtn = document.querySelector('.delBtn')
    delBtn.addEventListener('click',catDelet)

    async function catDelet(e){
        const delt = e.target.parentNode
        const catName = delt.querySelector('.catName')
        result = catName.innerHTML
        option = {result}
        const responseDel = await axios.post('/categorydel',option)
        delt.remove()
        const catLi = document.querySelectorAll('.afterBox > .catList > li')
        console.log(catLi)
    }

    const btnFin = document.querySelector('.btnBox > button')
    btnFin.addEventListener('click',submitHandelr)
    
    async function submitHandelr(){
        window.location.href="http://localhost:3001/admin/show/categorymgt"
    }
}

