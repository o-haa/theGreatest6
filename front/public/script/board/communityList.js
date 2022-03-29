let test = {}
document.addEventListener('DOMContentLoaded', init)

async function init() {
axios.defaults.baseURL = 'http://localhost:4001/board/community';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const response = await axios.post('/list')

    test = {
        ...response
    }

    const totalRows = response.data.result.length //56
    console.log(totalRows)
    const viewRows = 10
    const pagingBlock = 10


    const totalPage = Math.ceil(totalRows / viewRows)
    console.log(totalPage)
    const blockBox = Math.ceil(totalPage / pagingBlock)
    console.log(blockBox)

    let page = 3;
    const currentBlock = Math.ceil(page / pagingBlock) 
    const block = ((currentBlock - 1) * pagingBlock) 

    let endBlock = block + pagingBlock 
    if (endBlock > totalPage) endBlock = totalPage

    const paging = document.querySelector('#paging')

    for (let i = block + 1; i <= endBlock; i++) { //6
        const liElement = document.createElement('li')
        const aElement = document.createElement('a')

        aElement.setAttribute(`onClick`, `pages(${i})`)
        aElement.innerHTML = `[${i}]`
        liElement.appendChild(aElement)
        paging.appendChild(liElement)
    }
    

    const Nodes = response.data.result.slice((page - 1) * viewRows, page * viewRows)
    const tr = document.querySelector('#communityBoardRow')
    const tbody = document.querySelector('table > tbody')

    Nodes.forEach(v => { //처음 랜더 화면.

        const clone = document.importNode(tr.content, true)
        const td = clone.querySelectorAll('td')
        const aElement = document.createElement('a')
        aElement.href = '/board/community/view/' + v.board_idx
        aElement.innerHTML = v.board_subject

        td[0].innerHTML = v.board_idx
        td[1].appendChild(aElement)
        td[2].innerHTML = v.user_idx
        td[3].innerHTML = v.board_date
        td[4].innerHTML = v.board_hit

        tbody.appendChild(clone)
    })
}
//페이징 클릭하면 나오는 곳.
 async function pages(num) { 
    console.log('num',num)
    const tr = document.querySelector('#communityBoardRow')
    const value = test.data.result
    const clone = document.importNode(tr.content, true)

    const aElement = document.createElement('a')
    aElement.href = '/board/community//view' + value.board_idx
    aElement.innerHTML = value.board_subject

    const trElement = document.querySelector('#communityBoardRow').innerHTML
    const viewRows = 10
    const Nodes = test.data.result.slice((num - 1) * viewRows, num * viewRows)
    const tbody = document.querySelector('table > tbody')

    //화면 잘라주기 위해서 필요.
    let template = ''
    await Nodes.forEach(v => {})
    tbody.innerHTML = template
    
    //각 row에 값 넣어줌.
    await Nodes.forEach(v => { 

        const clone = document.importNode(tr.content, true)
        const td = clone.querySelectorAll('td')
        const aElement = document.createElement('a')
        aElement.href = '/board/community/view/' + v.board_idx
        aElement.innerHTML = v.board_subject

        td[0].innerHTML = v.board_idx
        td[1].appendChild(aElement)
        td[2].innerHTML = v.user_idx
        td[3].innerHTML = v.board_date
        td[4].innerHTML = v.board_hit

        const tbody = document.querySelector('table > tbody')
        tbody.appendChild(clone)
        
    })


}

