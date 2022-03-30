document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
    const writeFrm = document.querySelector('#writeFrm');
    const file = document.querySelector('#communityFile');
    writeFrm.addEventListener('submit',
    async function writeSubmit (e){
        e.preventDefault();
        const {communitySubject,communityContent,select} = e.target;

        const formData = {
            upload: file.files[0],
            select: select.value,
            subject: communitySubject.value,
            content: communityContent.value
        };

    
        try {
            const response = await axios.post(`/write`,formData);
            const{insertId} = response.data.result;
            location.href=`/board/community/view/${insertId}`;
            
        } catch(e){
            console.log(e.message);
            alert('try again');
        };
    
        

    });
    

};