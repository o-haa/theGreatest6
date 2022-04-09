
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/review';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const {user} = response1.data.result;

    const file = document.querySelector('#communityFile');
    // const src = document.querySelector('#src')
    
    file.addEventListener('change',inputFileName)
    function inputFileName(e){
        const inputFile = file.files[0];
        const name = document.querySelector('#inputName');
        name.textContent = inputFile.name;
            
        if(file.files[0].size > 0 ){
            const reader = new FileReader();
            
            console.log('확인 write',reader)
            reader.addEventListener('load',loadStor)
            function loadStor(){
                localStorage.setItem("file",reader.result);
            }
            
            reader.readAsDataURL(e.target.files[0])
            
        }else{
            
        }
    }
    
    const writeFrm = document.querySelector('#writeFrm');
    
    writeFrm.addEventListener('submit',writeSubmit);
    
    async function writeSubmit (e){
        e.preventDefault();
        const {communitySubject,communityContent,select} = e.target;
        const formData = new FormData()
            formData.append('upload',file.files[0])
            formData.append('category',(select.value))
            formData.append('subject',communitySubject.value)
            formData.append('content',communityContent.value)
            formData.append('userIdx',user.user_idx)
        try {   
            const response = await axios.post(`/write`,formData);
            const{insertId} = response.data.result;
            location.href=`/board/review/view/${insertId}`;
        } catch(e){
            console.log('reviewwrite',e.message);
            alert('try again');
        };

    };
    
};


