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
    const delBtn = document.querySelector('.delBtn')

    let resCat = responseGet.data //
    makebefore(resCat, catListB)
    makeafter()

    const newCat = document.querySelector('.newCat')
    let cats = [];
    let id = 0;

    // enter()

    // function setCats(newCats){
    //     cats = newCats
    // }
    // function getCats(){
    //     return cats
    // }
    // function appendCat(){
    //     const newId = id++
    //     const newCats = getCats().concat({id: newId, isCompleted: false, content: text })
    //     setCats(newTodos)
    //     makeCats();
    // }
    // function makeCats(){
    //     catList.innerHTML = null; //todoListElem 요소 안의 HTML 초기화
    //     const allTodos = getAllTodos() // todos 배열 가져오기

    //     allTodos.forEach(todo => { 
    //         const todoItemElem = document.createElement('li');
    //         todoItemElem.classList.add('todo-item');

    //         const checkboxElem = document.createElement('div');
    //         checkboxElem.classList.add('checkbox');

    //         const todoElem = document.createElement('div');
    //         todoElem.classList.add('todo');
    //         todoElem.innerText = todo.content;

    //         const delBtnElem = document.createElement('button');
    //         delBtnElem.classList.add('delBtn');
    //         delBtnElem.innerHTML = 'X';

    //         if(todo.isChecked) {
    //             todoItemElem.classList.add('checked');
    //             checkboxElem.innerText = '✔';
    //         }

    //         todoItemElem.appendChild(checkboxElem);
    //         todoItemElem.appendChild(todoElem);
    //         todoItemElem.appendChild(delBtnElem);

    //         todoListElem.appendChild(todoItemElem);
    //     })
    // }
    

    // function enter(){
    //     newCat.addEventListener('keypress', (e) =>{
    //         if( e.key === 'Enter' ){
    //             appendTodos(e.target.value); newCat.value ='';
    //         }
    //     })
    // }

    function makebefore(resCat, catList){
        resCat.forEach(v=>{
            const clone = document.importNode(temp.content,true)
            const catName = clone.querySelector('.catName')
            catName.innerHTML = `${v.show_category}`
            catList.append(clone)
        })
    }

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
                catLi[i].addEventListener('keypress', pressE)
            })
            console.log(i)
        }
    }

    function pressE(e){
        if(e.key === 'Enter') {
            // const clone = document.importNode(temp.content,true)
            const checkbox = document.querySelector('.checkbox')
            const catName = document.querySelector('.catName')
            const delBtn = document.querySelector('.delBtn')
            catName.innerHTML = `${e.target.value}`
            const parent = e.target.parentNode
            e.target.parentNode.innerHTML=''
            parent.append(checkbox)
            parent.append(catName)
            parent.append(delBtn)
        }
    }
}