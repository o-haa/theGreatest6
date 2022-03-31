document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
    const writeFrm = document.querySelector('#writeFrm');
    const file = document.querySelector('#communityFile');
    
    writeFrm.addEventListener('submit',writeSubmit);
    async function writeSubmit (e){
        e.preventDefault();
        const {communitySubject,communityContent,select} = e.target;

        const formData = new FormData()
            formData.append('upload',file.files[0])
            formData.append('select',select.value)
            formData.append('subject',communitySubject.value)
            formData.append('content',communityContent.value)
        
        console.log(formData)
        try {
            const response = await axios.post(`/write`,formData);
            const{insertId} = response.data.result;
            // location.href=`/board/community/view/${insertId}`;
            
        } catch(e){
            console.log(e);
            alert('try again');
        };
    
        

    };
    

};