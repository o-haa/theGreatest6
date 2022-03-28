document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    

    //list 
    const response = await axios.post('/list')
    console.log('hello')

    console.log(response)

    // const {totalRows} = response.data
    // const viewRows = 10
    // const pagingBlock = 5

    // const totalPage = Math.ceil(totalRows/viewRows)
    // const totalBlock = Math.ceil(totalPage/pagingBlock)

    // let page = 1;
    // const currentBlock = Math.ceil(page/pagingBlock)
    // const block = ((currentBlock-1) * pagingBlock)

    // let endBlock = block + pagingBlock
    // if(endBlock > totalPage) endBlock = totalPage

    // const paging = document.querySelector('#paging')
    // for (let i = block + 1; i<endBlock; i++){
    //     const liElement = document.createElement('li')
    //     const aElement = document.createElement('a')

    //     aElement.setAttribute('onClick',`pagemove(${i})`)
    //     aElement.innerHTML = `[${i}]`
    //     liElement.appendChild(aElement)
    //     paging.appendChild(liElement)
    // }

    const trElement = document.querySelector('#communityBoardRow').innerHTML
    const tr = document.querySelector('#communityBoardRow')
    const tbody = document.querySelector('table > tbody')
    const Nodes = response.data.result
    console.log(Nodes)

    let template = ''
    Nodes.forEach(v=>{
        const clone = document.importNode(tr.content,true)
        console.log(clone)
        const td = clone.querySelectorAll('td')
        const aElement = document.createElement('a')
        aElement.href = 'board/community/view/'+ v.board_idx
        aElement.innerHTML = v.subject
        console.log(td)

        td[0].innerHTML = v.board_idx
        td[1].appendChild(aElement)
        td[2].innerHTML = v.user_idx
        td[3].innerHTML = v.board_date
        td[4].innerHTML = v.board_hit
        
        tbody.appendChild(clone)
        

        template += trElement.replace('{idx}',v.board_idx)
                             .replace('{subject}',v.board_subject)
                             .replace('{nickname}',v.user_idx)
                             .replace('{date}',v.board_date)
                             .replace('{hit}',v.board_hit)

        tbody.innerHTML = template

    })

    



}