document.addEventListener('DOMContentLoaded', init)

async function init(e) {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response = await axios.post('showCard')
    console.log(response)
    console.log("접속")
}