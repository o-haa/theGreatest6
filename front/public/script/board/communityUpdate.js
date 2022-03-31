document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const [,,,,idx]=location.pathname.split('/');
    
    

    const [{board_subject,board_content}]=response.data.result;
    const showCategory = response.data.result[0].show_category_idx

    document.querySelector('#category').value = showCategory;
    document.querySelector('#subject').value = board_subject;
    document.querySelector('#content').vlaue = board_content;

    const updateFrm = document.querySelector('#updateFrm');
    const file = document.querySelector('#updateFile');
    
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
            console.log(response.data.result)
            location.href=`/board/community/view/${idx}`;
        } catch(e){
            console.log(e.message);
            alert('try again');
        };
        

    };

};