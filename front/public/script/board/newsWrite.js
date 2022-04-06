document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/news';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const {user} = response1.data.result;
    console.log('user',user)

    const writeFrm = document.querySelector('#writeFrm');
    
    writeFrm.addEventListener('submit',writeSubmit);
    async function writeSubmit (e){
        e.preventDefault();
        const {communitySubject,communityContent} = e.target;

        const body = {
            subject: communitySubject.value,
            content: communityContent.value,
            user:user
        }
        console.log(body)

        try {
            const response = await axios.post(`/write`,body);
            const{insertId} = response.data.result;
            location.href=`/board/news/view/${insertId}`;
        } catch(e){
            console.log('newswrite',e.message);
            alert('try again');
        };

    };
    
};