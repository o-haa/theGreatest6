let test = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = response1.data.result;
    const user_nickname = user.user_nickname;


}



        // for (let i = block + 1; i <= endBlock; i++) {
        //     paging.innerHTML = '';
        //     const liElement = document.createElement('li');
        //     const aElement = document.createElement('a');
        //     liElement.appendChild(aElement);
        //     paging.appendChild(liElement);
        //     pages(i)
            
        //     arr.push(i)
        //     // console.log(arr)
        //     for (let j = 1; j <= arr.length; j++) {
        //         aElement.innerHTML = `[${arr}]`
                
        //     }
        // }