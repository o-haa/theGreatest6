document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
    const [,,,,idx]=location.pathname.split('/')
    const subject = document.querySelector('#subject')
    const nickname = document.querySelector('#writer')
    const date = document.querySelector('#date')
    const content = document.querySelector('#content')
    const hit = document.querySelector('#hit')

    const upElement = document.querySelector('#update')
    const aElement = document.createElement('a')
    aElement.href = `/board/community/update/` + `${idx}`
    aElement.innerHTML = 'Edit'
    upElement.appendChild(aElement)
    
    const response = await axios.post(`/view/${idx}`,{
        withCredentials:true,
    })

    if(response.data.errno === 0){
        const [{user_nickname,board_subject,board_date,board_hit,board_content}]=response.data.result
        console.log(response.data.result)
        subject.innerHTML = board_subject
        nickname.innerHTML = nickname
        date.innerHTML = board_date
        hit.innerHTML = board_hit
        content.innerHTML = board_content
        

    } else {

    }

    //delete form
    const deleteFrm = document.querySelector('#deleteFrm')
    deleteFrm.addEventListener('submit',
    async function deleteSubmit (e){
        e.preventDefault()

        try{
            await axios.post(`/delete/${idx}`)
            location.href='/board/community/list'
        } catch {
            alert('try again')
        }
        
    })


}