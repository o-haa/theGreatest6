let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const check = document.querySelectorAll('#category ul li input');
    const checked = document.querySelectorAll('#category ul li input:checked');
    const prepare = [];

    let response;
    try {
        for (i = 0; i < checked.length; i++) {
            await prepare.push(checked[i].value);
        }
        const data = {
            prepare
        };
        console.log(prepare, 'all categories');
        response = await axios.post('/list', data);
    } catch (e) {
        console.log(e.message);
    }


    for (i = 0; i < check.length; i++) {
        check[i].addEventListener('click', clickHanlder);
    }
    async function clickHanlder() {
        try {
            const checked = document.querySelectorAll('#category ul li input:checked');
            const prepare = [];
            for (i = 0; i < checked.length; i++) {
                await prepare.push(checked[i].value);
            }
            const data = {
                prepare
            };
            console.log(prepare,'clicked')
            response = await axios.post('/list', data);
            return response.data;
        } catch (e) {
            console.log(e.message);
        }
    }
console.log(response.data)
test = {
        ...response
    };

    const totalRows = response.data.result.length;
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

        aElement.setAttribute(`onClick`, `pages(${i})`);//
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
    console.log('num', num)
    const tr = document.querySelector('#communityBoardRow');
    const value = test.data.result;
    // const clone = document.importNode(tr.content, true);

    const aElement = document.createElement('a');
    aElement.href = '/board/community//view' + value.board_idx;
    aElement.innerHTML = value.board_subject;

    // const trElement = document.querySelector('#communityBoardRow').innerHTML;
    const viewRows = 10;
    const Nodes = test.data.result.slice((num - 1) * viewRows, num * viewRows);
    const tbody = document.querySelector('table > tbody');


    let template = '';
    await Nodes.forEach(v => { });
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






    // check[0].addEventListener('click',classicH);
    // check[1].addEventListener('click',classicH);
    // check[2].addEventListener('click',classicH);
    // check[3].addEventListener('click',classicH);
//     async function classicH(e){
//         let check = document.querySelectorAll('#category ul li input');
//         if(check[0].checked==true){
//             const classicData = {
//                 category: check[0].name
//             };
//             const response = await axios.post('/list',classicData);
//         } else if (check[1].checked==true){
//             const musicalData = {
//                 category: check[1].name
//             };
//             const response = await axios.post('/list',musicalData);
            
//         } else if(check[2].checked==true){
//             const operaData = {
//                 category: check[2].name
//             };
//             const response = await axios.post('/list',operaData);
            
//         } else if(check[3].checked==true){
//             const balletData = {
//                 category: check[3].name
//             };
//             const response = await axios.post('/list',balletData);
            
//         };
//     }


    // async function musicalH(){
    //     let check = document.querySelectorAll('#category ul li input')
    //     if(check[1].checked==true){
    //         const musicalData = {
    //             category: check[1].name
    //         }
    //         const response = await axios.post('/list',musicalData)
            
    //     }
    // }
    // async function operaH(){
    //     let check = document.querySelectorAll('#category ul li input')
    //     if(check[2].checked==true){
    //         const operaData = {
    //             category: check[2].name
    //         }
    //         const response = await axios.post('/list',operaData)
            
    //     }
    // }
    // async function balletH(){
    //     let check = document.querySelectorAll('#category ul li input')
    //     if(check[3].checked==true){
    //         const balletData = {
    //             category: check[3].name
    //         }
    //         const response = await axios.post('/list',balletData)
            
    //     }
    // }
    
        
    
