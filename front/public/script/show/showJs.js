document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/promgram/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}
// 차후에 html에 axios링크 쓸 일이 있으면 그 파일명과 같이 이 파일명을 변경할것