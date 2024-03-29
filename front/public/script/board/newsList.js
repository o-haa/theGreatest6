let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/news';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = response1.data.result;
    const admin = user.user_id
    
    if( admin !== 'admin@gmail.com'){
        const button = document.querySelector('#box')
        button.innerHTML = ""
    }

    const checks = document.querySelectorAll('#category ul li input');
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
        console.log('newslistinit', e.message);
    }

    test = {
        ...response
    };

    console.log(response)
    const totalRows = response.data.result.length;
    const viewRows = 10;
    const pagingBlock = 10;


    const totalPage = Math.ceil(totalRows / viewRows);
    const blockBox = Math.ceil(totalPage / pagingBlock);

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

    await Nodes.forEach(v => {
        console.log(v)
        const clone = document.importNode(tr.content, true);
        const td = clone.querySelectorAll('td');
        const aElement = document.createElement('a');
        aElement.href = '/board/news/view/' + v.board_news_idx;
        aElement.innerHTML = v.news_subject;

        td[0].innerHTML = v.board_news_idx;
        td[1].appendChild(aElement);
        td[2].innerHTML = v.user_nickname;
        td[3].innerHTML = v.news_date;
        td[4].innerHTML = v.news_hit;

        tbody.appendChild(clone);
    })

    /* 체크박스 클릭 이벤트 */
    for (i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', clickHanlder);
    }
}

/* init 여기까지 */ 

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
        console.log(prepare, 'clicked')
        response = await axios.post('/list', data);


        test = {
            ...response
        };

        const totalRows = response.data.result.length;
        console.log(totalRows);
        const viewRows = 10;
        const pagingBlock = 10;


        const totalPage = Math.ceil(totalRows / viewRows);
        const blockBox = Math.ceil(totalPage / pagingBlock);

        let page = 1;
        const currentBlock = Math.ceil(page / pagingBlock);
        const block = ((currentBlock - 1) * pagingBlock);

        let endBlock = block + pagingBlock;
        if (endBlock > totalPage) endBlock = totalPage;

        ///여기서 부터 체크 페이징
        let paging = document.querySelector('#paging');
        arr = []
        paging.innerHTML='';
        for (let i = block + 1; i <= endBlock; i++) {
            arr.push(i)
        }
        let liElement;
        for(let j = 1; j <= arr.length ; j++){
            liElement = document.createElement('li');
            const aElement = document.createElement('a');
            aElement.innerHTML = `[${j}]`
            liElement.appendChild(aElement)
        }
        // paging.appendChild = liElement;

    } catch (e) {
            console.log('newslist', e.message);
        }
    }

/* 클릭 핸들러 여기까지 */

async function pages(num) {
        console.log('num', num)
        const tr = document.querySelector('#communityBoardRow');
        const value = test.data.result;

        const aElement = document.createElement('a');
        aElement.href = '/board/news//view' + value.board_news_idx;
        aElement.innerHTML = value.news_subject;

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
            aElement.href = '/board/news/view/' + v.board_news_idx;
            aElement.innerHTML = v.news_subject;
            td[0].innerHTML = v.board_news_idx;
            td[1].appendChild(aElement);
            td[2].innerHTML = v.user_nickname
            td[3].innerHTML = v.news_date;
            td[4].innerHTML = v.news_hit;

            const tbody1 = document.querySelector('table > tbody');
            tbody1.appendChild(clone);
        })
    }




