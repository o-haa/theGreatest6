document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    

    //update form
    const updateFrm = document.querySelector('#updateFrm')
    const select = document.querySelector('select')
    const updateSub = document.querySelector('#communitySubject')
    const updateCon = document.querySelector('#communityContent')

 
    

    const file = document.querySelector('#updateFile')
    updateFrm.addEventListener('submit',
    async function updateSubmit (e){
        e.preventDefault()
        const {updateSubject,updateContent,select} = e.target 
        console.log(file.files[0])

        const formData = new FormData()
        formData.append('upload',file.files[0])
        formData.append('select',select.value)
        formData.append('subject',updateSubject.value)
        formData.append('content',updateContent.value)
    
        try {
            const response = await axios.post(`/write:idx`,formData)
            
            const{insertId} = response.data.result
            location.href=`/board/community/view/${insertId}`
        } catch(e){
            console.log(e.message)
            alert('try again')
        }
        

    })

}