document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/admin/show/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const catList = document.querySelector('.catList')
    const newCat = document.querySelector('.newCat')
    let cats = [];
    let id = 0;

    const response = await axios.post('categorymgt')
    console.log('1')



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
}