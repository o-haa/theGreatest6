let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
axios.defaults.baseURL = 'http://localhost:4001/board/community';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const response = await axios.post('/list');

const classicC = document.querySelector('#classic');
const musicalC = document.querySelector('#musical');
const operaC = document.querySelector('#opera');
const balletC = document.querySelector('#ballet');

musicalC.addEventListener('click',checks);
// check[1].addEventListener('click',checks);
// check[2].addEventListener('click',checks);
// check[3].addEventListener('click',checks);

    async function checks () {
    console.log(musicalC.hasAttribute('checked'))
    // for(let i=0; i < check.length; i++){
    //     if(check[i].checked == true){
    //         const categoryData = {
    //             category: i
    //         };
            const response = await axios.post('/list',categoryData);
            location.href='/board/community/list';
        }
        // if(check[0].checked==true){
        //     const classicData = {
        //         category: check[0].name
        //     };
        //     const response = await axios.post('/list',classicData);
        //     location.href='/board/community/list';
        // } else if (check[1].checked==true){
        //     const musicalData = {
        //         category: check[1].name
        //     };
        //     const response = await axios.post('/list',musicalData);
        //     location.href='/board/community/list';
        // } else if(check[2].checked==true){
        //     const operaData = {
        //         category: check[2].name
        //     };
        //     const response = await axios.post('/list',operaData);
        //     location.href='/board/community/list';
        // } else if(check[3].checked==true){
        //     const balletData = {
        //         category: check[3].name
        //     };
        //     const response = await axios.post('/list',balletData);
        //     location.href='/board/community/list';
        // };
    


    
    test = {
        ...response
    };

    const totalRows = response.data.result.length ;
    console.log(totalRows);
    const viewRows = 10;
    const pagingBlock = 10;


    const totalPage = Math.ceil(totalRows / viewRows);
    console.log(totalPage);
    const blockBox = Math.ceil(totalPage / pagingBlock);
    console.log(blockBox);

    let page = 1;
    const currentBlock = Math.ceil(page / pagingBlock);
    const block = ((currentBlock - 1) * pagingBlock);

    let endBlock = block + pagingBlock; 
    if (endBlock > totalPage) endBlock = totalPage;

    const paging = document.querySelector('#paging');

    for (let i = block + 1; i <= endBlock; i++) { 
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');

        aElement.setAttribute(`onClick`, `pages(${i})`);
        aElement.innerHTML = `[${i}]`;
        liElement.appendChild(aElement);
        paging.appendChild(liElement);
    }
    

    const Nodes = response.data.result.slice((page - 1) * viewRows, page * viewRows);
    const tr = document.querySelector('#communityBoardRow');
    const tbody = document.querySelector('table > tbody');

    Nodes.forEach(v => { 

        const clone = document.importNode(tr.content, true);
        const td = clone.querySelectorAll('td');
        const aElement = document.createElement('a');
        aElement.href = '/board/community/view/' + v.board_idx;
        aElement.innerHTML = v.board_subject;

        td[0].innerHTML = v.board_idx;
        td[1].appendChild(aElement);
        td[2].innerHTML = v.user_idx;
        td[3].innerHTML = v.board_date;
        td[4].innerHTML = v.board_hit;

        tbody.appendChild(clone);
    })

}

async function pages(num) { 
    console.log('num',num)
    const tr = document.querySelector('#communityBoardRow');
    const value = test.data.result;

    const aElement = document.createElement('a');
    aElement.href = '/board/community//view' + value.board_idx;
    aElement.innerHTML = value.board_subject;

    const viewRows = 10;
    const Nodes = test.data.result.slice((num - 1) * viewRows, num * viewRows);
    const tbody = document.querySelector('table > tbody');

   
    let template = '';
    await Nodes.forEach(v => {});
    tbody.innerHTML = template;
    

    await Nodes.forEach(v => { 

        const clone = document.importNode(tr.content, true);
        const td = clone.querySelectorAll('td');
        const aElement = document.createElement('a');
        aElement.href = '/board/community/view/' + v.board_idx;
        aElement.innerHTML = v.board_subject;

        td[0].innerHTML = v.board_idx;
        td[1].appendChild(aElement);
        td[2].innerHTML = v.user_idx;
        td[3].innerHTML = v.board_date;
        td[4].innerHTML = v.board_hit;

        const tbody = document.querySelector('table > tbody');
        tbody.appendChild(clone);
    })
}
