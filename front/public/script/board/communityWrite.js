document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    

    //write form
    const writeFrm = document.querySelector('#writeFrm')
    const file = document.querySelector('#communityFile')
    writeFrm.addEventListener('submit',async (e)=>{
        e.preventDefault()
        const {communitySubject,communityContent,select} = e.target 
        console.log(communitySubject,communityContent,select) 
        console.log(file.files[0])

        const formData = new FormData()
        formData.append('upload',file.files[0])
        formData.append('select',select.value)
        formData.append('subject',communitySubject.value)
        formData.append('content',communityContent.value)
    
        try {
            const response = await axios.post(`/write`,formData)
            console.log(response.data)
            // location.href=`/board/community/view`
        } catch(e){
            console.log(e.message)
            alert('try again')
        }
    
        

    })

}