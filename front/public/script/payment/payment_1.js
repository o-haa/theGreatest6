let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const answer = document.querySelectorAll('.answer input')
    const yes = document.querySelector('#yes')
    const pointCheckBox = document.querySelector('#pointCheckBox')

    answer.forEach(v =>v.addEventListener('click', clickHandler))

    function clickHandler() {
        if (yes.checked) {
            pointCheckBox.style.display = 'block';
        } else {
            pointCheckBox.style.display = 'none';
        }
    }

    pointCheckBtn.addEventListener('click',pointCheckBtnhandler)

    async function pointCheckBtnhandler(){
        const response = await axios.post('')



    }
}
