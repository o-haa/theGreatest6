

document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const [,,,,idx]=location.pathname.split('/');
    const response1 = await axios.post(`http://localhost:4001/board/community/view/${idx}`, null)
    console.log(response1.data.result)

    const [{board_subject,board_content}]=response1.data.result;

    document.querySelector('#updateSubject').value = board_subject
    document.querySelector('#updateContent').value = board_content;

    const updateFrm = document.querySelector('#updateFrm');
    const file = document.querySelector('#updateFile');

    file.addEventListener('change',inputFileName)
    function inputFileName(input){
        const inputFile = file.files[0];
        const name = document.querySelector('#inputName');
        name.textContent = inputFile.name;
    }
    
    updateFrm.addEventListener('submit',updateSubmit);
    async function updateSubmit (e){
        e.preventDefault();
        const {updateSubject,updateContent,select} = e.target;
    
        const formData = new FormData()
            formData.append('upload',file.files[0])
            formData.append('select',select.value)
            formData.append('subject',updateSubject.value)
            formData.append('content',updateContent.value)
        
        try {
            const response = await axios.post(`/update/${idx}`,formData)
            console.log(response)
            location.href=`/board/community/view/${idx}`;
        } catch(e){
            console.log('communityupdate',e.message);
            alert('try again');
        };

    };

};