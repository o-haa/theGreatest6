document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const writeForm = document.querySelector('#writeForm')
    const file = document.querySelector('#showUpload')

    writeForm.addEventListener('submit')

    async function uploadHandler(e){
        console.lot(e.target)
    }
    
}