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
            // return response.data;

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
                paging.innerHTML = '';
                const liElement = document.createElement('li');
                const aElement = document.createElement('a');
                liElement.appendChild(aElement);
                paging.appendChild(liElement);
                // paging.innerHTML = '';
                pages(i)
                // aElement.setAttribute(`onClick`, `pages(${i})`);//
                
                aElement.innerHTML = `[${i}]`
                
            }
        
        
            const Nodes = response.data.result.slice((page - 1) * viewRows, page * viewRows);
            const tr = document.querySelector('#communityBoardRow');
            const tbody = document.querySelector('table > tbody');
        
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
        
                tbody.appendChild(clone);
            })

            async function pages(num) {
                console.log('num', num)
                const tr = document.querySelector('#communityBoardRow');
                const value = test.data.result;
                console.log(value)
            
                const aElement = document.createElement('a');
                aElement.href = '/board/community//view' + value.board_idx;
                aElement.innerHTML = value.board_subject;
            
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
            
                    const tbody1 = document.querySelector('table > tbody');
                    tbody1.appendChild(clone);
                })
            }
        
        } catch (e) {
            console.log(e.message);
        }
    }

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

        aElement.setAttribute(`onClick`, `pagess(${i})`);
        aElement.innerHTML = `[${i}]`;
        liElement.appendChild(aElement);
        paging.appendChild(liElement);
    }


    const Nodes = response.data.result.slice((page - 1) * viewRows, page * viewRows);
    const tr = document.querySelector('#communityBoardRow');
    const tbody = document.querySelector('table > tbody');

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

        tbody.appendChild(clone);
    })

}
async function pagess(num) {
    console.log('num', num)
    const tr = document.querySelector('#communityBoardRow');
    const value = test.data.result;
    console.log(value)

    const aElement = document.createElement('a');
    aElement.href = '/board/community//view' + value.board_idx;
    aElement.innerHTML = value.board_subject;

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

        const tbody1 = document.querySelector('table > tbody');
        tbody1.appendChild(clone);
    })
}
// async function pagess(num) {
//     // console.log('num', num)
//     // const tr = document.querySelector('#communityBoardRow');
//     // const value = test.data.result;

//     // const aElement = document.createElement('a');
//     // aElement.href = '/board/community//view' + value.board_idx;
//     // aElement.innerHTML = value.board_subject;

//     const viewRows = 10;
//     const Nodesss = test.data.result.slice((num - 1) * viewRows, num * viewRows);
//     const tbody = document.querySelector('table > tbody');


//     let template = '';
//     await Nodesss.forEach(v => { });
//     tbody.innerHTML = template;


    // await Nodesss.forEach(v => {

    //     const clone = document.importNode(tr.content, true);
    //     const td = clone.querySelectorAll('td');
    //     const aElement = document.createElement('a');
    //     aElement.href = '/board/community/view/' + v.board_idx;
    //     aElement.innerHTML = v.board_subject;

    //     td[0].innerHTML = v.board_idx;
    //     td[1].appendChild(aElement);
    //     td[2].innerHTML = v.user_idx;
    //     td[3].innerHTML = v.board_date;
    //     td[4].innerHTML = v.board_hit;

    //     const tbody = document.querySelector('table > tbody');
    //     tbody.appendChild(clone);
    // })
// }





        

