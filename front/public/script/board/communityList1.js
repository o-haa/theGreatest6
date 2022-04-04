let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const response = await axios.post('/list');

    let check = document.querySelectorAll('#category ul li input');
    check[0].addEventListener('click',checks);
    check[1].addEventListener('click',checks);
    check[2].addEventListener('click',checks);
    check[3].addEventListener('click',checks);

    async function checks () {
        for(let i=0; i < check.length; i++){
            if(check[i].checked == true){
                const categoryData = {
                    category: i
                };
                const response = await axios.post('/list',categoryData);
                console.log(response)
                location.href='/board/community/list';