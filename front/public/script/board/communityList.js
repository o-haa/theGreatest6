let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = response1.data.result;
    const user_nickname = user.user_nickname;

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
        console.log('communitylistinit', e.message);
    }

    test = {
        ...response
    };

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

    const arrPage2 = []
    for (let i = block + 1; i <= endBlock; i++) {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');

        aElement.setAttribute(`onClick`, `pages(${i})`);
        aElement.innerHTML = `[${i}]`;
        liElement.appendChild(aElement);
        paging.appendChild(liElement);

    }
    // for (let i = block + 1; i <= endBlock; i++) {
    //     paging.innerHTML = '';
    //     const liElement = document.createElement('li');
    //     const aElement = document.createElement('a');
    //     liElement.appendChild(aElement);
    //     paging.appendChild(liElement);

    //     pages(i)
    //     // aElement.setAttribute(`onClick`, `pages(${i})`);//
    //     arr.push(i)
    //     console.log(arr)
    //     for (let j = 1; j <= arr.length; j++) {
    //         aElement.innerHTML = `[${arr}]`
    //     }



    const Nodes = response.data.result.slice((page - 1) * viewRows, page * viewRows);
    const tr = document.querySelector('#communityBoardRow');
    const tbody = document.querySelector('table > tbody');

    await Nodes.forEach(v => {
        const showCategory = v.show_category_idx
        const clone = document.importNode(tr.content, true);
        const td = clone.querySelectorAll('td');
        const aElement = document.createElement('a');
        aElement.href = '/board/community/view/' + v.board_idx;
        aElement.innerHTML = v.board_subject;

        td[0].innerHTML = v.board_idx;
        switch (showCategory) {
            case 1:
                td[1].innerHTML = 'Classic';
                td[1].style.color = "#A5A5A5";
                break;
            case 2:
                td[1].innerHTML = 'Musical';
                td[1].style.color = "#DB6039";
                break;
            case 3:
                td[1].innerHTML = 'Opera';
                td[1].style.color = "#64CBE6";
                break;
            case 4:
                td[1].innerHTML = 'Ballet';
                td[1].style.color = "#FAE100";
                break;
        }
        td[2].appendChild(aElement);
        td[3].innerHTML = user_nickname
        td[4].innerHTML = v.board_date;
        td[5].innerHTML = v.board_hit;

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
        const paging = document.querySelector('#paging');
        arr = []
        //클릭했을 떄 바로 반영이 아닌 페이징 눌러야 반영....length 비교 >>>
        //처음나오는 페이징이 고정
        paging.innerHTML = '';
        for (let i = block + 1; i <= endBlock; i++) {
            arr.push(i)
        }
        console.log(arr.length)
        for(let j = 1; j <= arr.length ; j++){
            // console.log(j)
            const liElement = document.createElement('li');
            const aElement = document.createElement('a');
            aElement.innerHTML = `[${j}]`
            // arr[j] = aElement
        }


            // paging.innerHTML = '';
            // arr.push(i)
            // console.log(arr.length)
            // for (let j = 0; j <= arr.length; j++) {
            //     arr.push(j)
            //     // console.log(arr)
            //     const liElement = document.createElement('li');
            //     const aElement = document.createElement('a');
            //     aElement.addEventListener('click',pages(`${j})`))
            // }


            // aElement.innerHTML = arr
            // console.log(aElement)
            // arr.push(aElement.innerHTML)
            // for (let j = 0; j <= totalRows/10; j++) {
            //     arr.push(`[${i}]`)
            //     arr[j].addEventListener('click',`pages(${j})`);
            //     aElement.setAttribute(`onClick`, `pages(${j})`);

            // }
            //     arr.forEach(v=>{
            //         v.addEventListener('click',`pages(${i})`);
            // })
            // aElement.setAttribute(`onClick`, `pages(${i})`);


            // liElement.appendChild(aElement);
            // paging.appendChild(liElement);
            // }
        } catch (e) {
            console.log('communitylist', e.message);
        }
    }

/* 클릭 핸들러 여기까지 */

async function pages(num) {
        const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
        const { user } = response1.data.result;
        const user_nickname = user.user_nickname;

        console.log('num', num)
        const tr = document.querySelector('#communityBoardRow');
        const value = test.data.result;

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
            const showCategory = v.show_category_idx
            const clone = document.importNode(tr.content, true);
            const td = clone.querySelectorAll('td');
            const aElement = document.createElement('a');
            aElement.href = '/board/community/view/' + v.board_idx;
            aElement.innerHTML = v.board_subject;


            td[0].innerHTML = v.board_idx;
            switch (showCategory) {
                case 1:
                    td[1].innerHTML = 'Classic';
                    td[1].style.color = "#A5A5A5";
                    break;
                case 2:
                    td[1].innerHTML = 'Musical';
                    td[1].style.color = "#DB6039";
                    break;
                case 3:
                    td[1].innerHTML = 'Opera';
                    td[1].style.color = "#64CBE6";
                    break;
                case 4:
                    td[1].innerHTML = 'Ballet';
                    td[1].style.color = "#FAE100";
                    break;
            }
            td[2].appendChild(aElement);

            td[3].innerHTML = user_nickname
            td[4].innerHTML = v.board_date;
            td[5].innerHTML = v.board_hit;

            const tbody1 = document.querySelector('table > tbody');
            tbody1.appendChild(clone);
        })
    }



