document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/news';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const [,,,,idx]=location.pathname.split('/');
    const response1 = await axios.post(`http://localhost:4001/board/news/view/${idx}`, null)
    console.log(response1.data.result)

    const [{news_subject,news_content,news_idx}]=response1.data.result;

    document.querySelector('#useridx').value = news_idx
    document.querySelector('#updateSubject').value = news_subject
    document.querySelector('#updateContent').value = news_content;

    const updateFrm = document.querySelector('#updateFrm');

    updateFrm.addEventListener('submit',updateSubmit);
    async function updateSubmit (e){
        e.preventDefault();
        const {communitySubject,communityContent} = e.target;

        const body = {
            subject: communitySubject.value,
            content: communityContent.value,
        }
        
        try {
            const response = await axios.post(`/update/${idx}`,body)
            console.log(response)
            location.href=`/board/news/view/${idx}`;
        } catch(e){
            console.log('newsupdate',e.message);
            alert('try again');
        };

    };

};