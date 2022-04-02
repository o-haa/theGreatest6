

document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = response1.data.result;
    const user_nickname = user.user_nickname;

    const [,,,,idx]=location.pathname.split('/');
    const boardIdx = document.querySelector('#idx');
    const category = document.querySelector('#category')
    const subject = document.querySelector('#subject');
    const nickname = document.querySelector('#writer');
    const date = document.querySelector('#date');
    const content = document.querySelector('#bContent');
    const hit = document.querySelector('#hit');
    const file = document.querySelector('#imgView');

    const upElement = document.querySelector('#update');
    const aElement = document.createElement('a');
    aElement.href = `/board/community/update/` + `${idx}`;
    aElement.innerHTML = 'Edit';
    upElement.appendChild(aElement);
    
    const response = await axios.post(`/view/${idx}`,{
        withCredentials:true,
    });
    const showCategory = response.data.result[0].show_category_idx
   
    if(response.data.errno === 0){
        const [{board_subject,board_date,board_hit,board_content}]=response.data.result;
        switch (showCategory){
            case 1:
                category.innerHTML = 'Classic';
                category.style.backgroundColor = "#A5A5A5";
            break;
            case 2:
                category.innerHTML = 'Musical';
                category.style.backgroundColor = "#DB6039";
            break;
            case 3:
                category.innerHTML = 'Opera';
                category.style.backgroundColor = "#64CBE6";
            break;
            case 4:
                category.innerHTML = 'Ballet';
                category.style.backgroundColor = "#FAE100";
            break;   
        }
        // category.innerHTML = showCategory
        boardIdx.innerHTML = idx;
        subject.innerHTML = board_subject;
        nickname.innerHTML = user_nickname
        date.innerHTML = board_date;
        hit.innerHTML = board_hit;
        content.innerHTML = board_content;

    } else {

    };

    const deleteFrm = document.querySelector('#deleteFrm');
    deleteFrm.addEventListener('submit',
    async function deleteSubmit (e){
        e.preventDefault();

        try{
            await axios.post(`/delete/${idx}`);
            location.href='/board/community/list';
        } catch {
            alert('try again');
        };
        
    });


};


// const uploadedFile = file.files[0];
    // console.log(uploadedFile)
    // const image = document.createElement('img');
    // console.log(image)
    // image.setAttribute('class','img')
    // image.src = URL.createObjectURL(file)
    // file.appendChild(image)
    // const auth = await axios.post('/auth')

    // console.log(auth.data)