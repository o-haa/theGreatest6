document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
    const [,,,,idx]=location.pathname.split('/')

    //update form
    const updateFrm = document.querySelector('#updateFrm')

    const file = document.querySelector('#updateFile')
    
    updateFrm.addEventListener('submit',updateSubmit)
    async function updateSubmit (e){
        e.preventDefault()
        const {updateSubject,updateContent,select} = e.target 

        const formData = {
            upload: file.files[0],
            select: select.value,
            subject: updateSubject.value,
            content: updateContent.value
        }
    
        try {
            await axios.post(`/update/${idx}`,formData)
            location.href=`/board/community/view/${idx}`
        } catch(e){
            console.log(e.message)
            alert('try again')
        }
        

    }

}