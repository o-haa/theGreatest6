document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const writeForm = document.querySelector('#writeForm');
    writeForm.addEventListener('submit',makeData)

    async function makeData(e){
        e.preventDefault();

        const data = {
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
        
        try{
            const response = await axios.post('/showwrite',data)
            
            let idx = response.data.result.insertId
            location.href = `http://localhost:3001/show/program/showview/${idx}`
        }
        catch(e){

        console.log(data);
        const response = await axios.post('showwrite',data);

        if(response!==undefined){
            // const { idx } = response.data.result;
            location.href=`http://localhost:3001/show/program/showview/${idx.value}`,{
                withCredentials:true,
            }
        }else{
            alert('에러!');
        }
    }
}