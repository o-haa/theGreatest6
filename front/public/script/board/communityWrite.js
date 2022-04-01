document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const file = document.querySelector('#communityFile');
    const fileInput = document.querySelector('#fileName')
    file.addEventListener('click',inputFileName)
    function inputFileName (input) {
        const name = input.file[0];
        console.log(name)
        // fileInput.textContent = name.nameInput
    }
    
    const writeFrm = document.querySelector('#writeFrm');
    
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