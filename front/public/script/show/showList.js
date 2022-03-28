document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/promgram/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    // 헤더 nav home, admin 이동
    const homeBtn = document.querySelector('#home');
    const aboutBtn = document.querySelector('#about');

    homeBtn.addEventListener('click',() => {
        window.location.href = 'http://localhost:3001/';
    })
    aboutBtn.addEventListener('click',() => {
        window.location.href = 'http://localhost:3001/about';
    })

    const Nodes = data.list;
    const trElement = document.querySelector('#showList_row').innerHTML;
    let template=''

    //교수님 코드
    Nodes.forEach(v=>{
        template += trElement.replace('{idx}',v.idx)
                        .replace('{subject}',v.subject)
                        .replace('{title}',v.title)
                        .replace('{userid}',v.userid)
                        .replace('{content}',v.content);
    })
    const thead = document.querySelector('.listTable thead');
    const tbody = document.querySelector('.listTable tbody');
    tbody.innerHTML = template;
}