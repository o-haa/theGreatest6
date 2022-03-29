let test = {}
document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
    const response = await axios.post('/list')

    test = {
        ...response
    }

    const totalRows = response.data.result.length
    const viewRows = 10
    const pagingBlock = 5

    const totalPage = Math.ceil(totalRows/viewRows) 
    const blockBox = Math.ceil(totalPage/pagingBlock)

    let page = 2; 
    const currentBlock = Math.ceil(page/pagingBlock)
    const block = ((currentBlock-1) * pagingBlock)

    let endBlock = block + pagingBlock
    if(endBlock > totalPage) endBlock = totalPage

    const paging = document.querySelector('#paging')
    for (let i = block + 1; i <= endBlock; i++){
        const liElement = document.createElement('li')
        const aElement = document.createElement('a')

        aElement.onclick = pages()

        aElement.setAttribute(`onClick`,`pages(${i})`)
        aElement.innerHTML = `[${i}]`
        liElement.appendChild(aElement)
        paging.appendChild(liElement)
    }

    const Nodes = response.data.result.slice((page -1) * viewRows, page * viewRows)
    const tr = document.querySelector('#communityBoardRow')
    const tbody = document.querySelector('table > tbody')

    Nodes.forEach(v=>{
        const clone = document.importNode(tr.content,true)
        const td = clone.querySelectorAll('td')
        const aElement = document.createElement('a')
        aElement.href = 'view/'+ v.board_idx
        aElement.innerHTML = v.board_subject

        td[0].innerHTML = v.board_idx
        td[1].appendChild(aElement)
        td[2].innerHTML = v.user_idx
        td[3].innerHTML = v.board_date
        td[4].innerHTML = v.board_hit
        
        tbody.appendChild(clone)
    })
    
    function pages (num){
        const tr = document.querySelector('#communityBoardRow')
        const value = response.data.result
        const clone = document.importNode(tr.content,true)
        const td = clone.querySelectorAll('td')
        const aElement = document.createElement('a')
        aElement.href = 'view/'+ value.board_idx
        aElement.innerHTML = value.board_subject
     
        const trElement = document.querySelector('#communityBoardRow').innerHTML
        const Nodes1 = test.data.result.slice((num-1) * viewRows, num * viewRows)
        
        let template = ''
        Nodes1.forEach(v=>{
            template += trElement.replace('{idx}',v.board_idx)
                             .replace(td1)
                             .replace('{nickname}',v.user_idx)
                             .replace('{date}',v.board_date)
                             .replace('{hit}',v.board_hit)
        })  
        const tbody = document.querySelector('table > tbody')
        tbody.innerHTML = template
    }
    
    pages(2)
    
    // function getcheckboxvalue() {
    //     const query = 'input [#classic]:checked'
    //     const check = document.querySelectorAll(query)

    //     let result = ''
    //     check.forEach((i)=>{
    //         result += i.value + ''
    //     }
    // }
   

}