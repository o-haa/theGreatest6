document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const writeForm = document.querySelector('#writeForm');
    writeForm.addEventListener('submit',makeData)
    async function makeData(e){
        e.preventDefault();
        const idx = 1
        const data = {
            idx:idx.value,
            category : document.querySelector('#category').value,
            xrated : document.querySelector('#category').value,
            title : document.querySelector('#title').value,
            ticketMonth : document.querySelector('#ticketMonth option').value,
            ticketDate : document.querySelector('#ticketDate option').value,
            ticketHour : document.querySelector('#ticketHour option').value,
            place : document.querySelector('#place').value,
            showMain : document.querySelector('#showMain').value,
            showSub : document.querySelector('#showSub').value,
            showDirector : document.querySelector('#showDirector').value,
            showCompany : document.querySelector('#showCompany').value
        }
        console.log(data);
        
        try{
            //입력받은 값을 가지고 백엔드에 axios로 요청 보내기
            const response = await axios.post('http://localhost:4001/show/program/showwrite',data)
            //body 속성값이 담긴 data : 잘 도착함
            // console.log('response : ',response.data.result.insertId)
            let idx = response.data.result.insertId
            location.href = `http://localhost:3001/show/program/showview/${idx}`
        }catch(e){

        }
    }
}
// testUser localhost
//password