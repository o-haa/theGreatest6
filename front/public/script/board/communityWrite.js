
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const {user} = response1.data.result;
    console.log('user',user)

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

    
    
    // src.addEventListener('load',getDataUrl)
    // function getDataUrl(img){
    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext("2d");
    //     canvas.width = src.width;
    //     canvas.height = src.height;
    //     ctx.drawImage(src,0,0);
        
    //     const base64 = canvas.toDataURL('image/*');
    //     console.log(base64)
    //     // const strImage = base64.replace(/^data:image\/[a-z]+;base64,/,"");
    //     try{
    //         localStorage.setItem('file',JSON.stringify(base64))
    //         console.log('good')
    //     } catch(e){
    //         console.log('localstorage fail',e.message)
    //     }
    // }
    
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
            formData.append('user',user)
        
        try {
            const response = await axios.post(`/write`,formData);
            const{insertId} = response.data.result;
            location.href=`/board/community/view/${insertId}`;
        } catch(e){
            console.log('communitywrite',e.message);
            alert('try again');
        };

    };
    
};