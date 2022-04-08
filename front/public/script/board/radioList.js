let test = {};
let rows = [];
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const checks = document.querySelectorAll('#category ul li label input');
    checks.forEach(v => {
        console.log('v',v)
        v.addEventListener('click', checkedHandler)
    })

    const checked = document.querySelector('#category ul li label input:checked')

    const data1 = {
        category: checked.id
    }
    let response = await axios.post('/list', data1)
    // response = await axios.post('http://localhost:4001/show/program/getcategories',null)
    // const categories = response.data.result;
    //checked를 만들기 위해서 가져옴 >>나중에 시간 남으면 하자

    test = {
        ...response.data
    };


    const totalRecords = response.data.result.length
    recordsPerPage = 5;
    pagesPerBlock = 10;

    const totalPage = Math.ceil(totalRecords / recordsPerPage)
    const totalBlock = Math.ceil(totalPage / pagesPerBlock)

    let page = 1;
    currentBlock = Math.ceil(page / pagesPerBlock) * pagesPerBlock;


    startPageperBlock = [Math.ceil(page / pagesPerBlock) - 1] * pagesPerBlock
    endPageperBlock = Math.ceil(page / pagesPerBlock) * pagesPerBlock

    console.log(startPageperBlock, endPageperBlock);

    if (endPageperBlock > totalPage) endPageperBlock = totalPage;
    const paging = document.querySelector('#paging');

    //페이징 시작....
    for (let i = startPageperBlock + 1; i <= endPageperBlock; i++) {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');

        aElement.setAttribute(`onClick`, pages(`${i}`));
        aElement.innerHTML = `[${i}]`;
        liElement.appendChild(aElement);
        paging.appendChild(liElement);
    }


    // 레코드 자르기
    const Nodes = response.data.result.slice((page - 1) * recordsPerPage, page * recordsPerPage);
    const tr = document.querySelector('#communityBoardRow');
    const tbody = document.querySelector('tbody')

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
        td[3].innerHTML = '저기요?'
        td[4].innerHTML = v.board_date;
        td[5].innerHTML = v.board_hit;

        tbody.appendChild(clone);


        let endPageperBlock = startPageperBlock + pagesPerBlock;
        if (endPageperBlock > totalPage) endPageperBlock = totalPage;


        const paging = document.querySelector('#paging');


        let template = '';
        Nodes.forEach(v => { });
        tbody.innerHTML = template;

        paging.innerHTML = '';

        for (let i = startPageperBlock + 1; i <= endPageperBlock; i++) {
            const liElement = document.createElement('li');
            const aElement = document.createElement('a');

            aElement.setAttribute(`onClick`, pages(`${i}`));
            aElement.innerHTML = `[${i}]`;
            liElement.appendChild(aElement);
            paging.appendChild(liElement);
        }
    })



}



async function checkedHandler(e) {
    const data = {
        category: e.target.value
    }
    try {
        let response = await axios.post('/list', data)
        response = response.data

        test = {
            ...response
        };

        const totalRows = response.result.length;
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

            aElement.setAttribute(`onClick`, pages(`${i}`));
            aElement.innerHTML = `[${i}]`;
            liElement.appendChild(aElement);
            paging.appendChild(liElement);
        }

        const Nodes = response.result.slice((page - 1) * viewRows, page * viewRows);
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
            td[3].innerHTML = '저기요?'
            td[4].innerHTML = v.board_date;
            td[5].innerHTML = v.board_hit;

            tbody.appendChild(clone);


            let endBlock = block + pagingBlock;
            if (endBlock > totalPage) endBlock = totalPage;


            const paging = document.querySelector('#paging');


            let template = '';
            Nodes.forEach(v => { });
            tbody.innerHTML = template;

            paging.innerHTML = '';
            for (let i = block + 1; i <= endBlock; i++) {
                const liElement = document.createElement('li');
                const aElement = document.createElement('a');

                aElement.setAttribute(`onClick`, pages(`${i}`));
                aElement.innerHTML = `[${i}]`;
                liElement.appendChild(aElement);
                paging.appendChild(liElement);
            }
        })
    }
    catch (e) {
        console.log('/communitylist', e)
    }
}


async function pages(num) {
    console.log(test)
    console.log('num', num)
    const tr = document.querySelector('#communityBoardRow');
    const value = test.result;

    const aElement = document.createElement('a');
    aElement.href = '/board/community//view' + value.board_idx;
    aElement.innerHTML = value.board_subject;

    const viewRows = 10;
    const Nodes = test.result.slice((num - 1) * viewRows, num * viewRows);
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
        td[3].innerHTML = '저기요?'
        td[4].innerHTML = v.board_date;
        td[5].innerHTML = v.board_hit;

        tbody.appendChild(clone);

    })
}