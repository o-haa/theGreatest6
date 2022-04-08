document.addEventListener('DOMContentLoaded', init);
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = response1.data.result;


    const [, , , , bIdx] = location.pathname.split('/');
    const boardIdx = document.querySelector('#idx');
    const category = document.querySelector('#category')
    const subject = document.querySelector('#subject');
    const nickname = document.querySelector('#writer');
    const date = document.querySelector('#date');
    const content = document.querySelector('#bContent');
    const hit = document.querySelector('#hit')
    
    const xhr = new XMLHttpRequest();
    const like = document.querySelector('.like')
    let useridxx = document.querySelector('#viewHead > td > input')
    useridxx.value = user.user_idx
    const likeUserIdx = useridxx.value
    const likeDB = await axios.post(`/likelist/${bIdx}`)
    if(user.user_idx == likeUserIdx){
        like.addEventListener('click',likeHandler)
        async function likeHandler(){
            if(likeDB.data.result.length === 0){
                try{
                    const data = {
                        likeUserIdx
                    }
                    const insert = await axios.post(`/likeinsert/${bIdx}`,data)
                    like.innerHTML = '❤️'
                    location.reload()
                } catch(e){
                    console.log('/communitylikeinsert',e.message)
                };
            }else if (likeDB.data.result.length > 0){
                const likeDB = await axios.post(`/likelist/${bIdx}`)
                let likedata = likeDB.data.result  
                let flag = likedata.result[0].like_board_flag
                if(flag === 0){
                    like.innerHTML = '❤️'
                } else {
                    like.innerHTML = '❤️‍🩹' 
                };
                try{
                    const data = {
                        likeUserIdx,
                        likedata
                    }
                    const insert = await axios.post(`/likeupdate/${bIdx}`,data)
                } catch(e){
                    console.log('/communitylike',e.message)
                };
            };
        };
    };

    
        
    
        

        

    const upElement = document.querySelector('#update');
    const aElement = document.createElement('a');
    aElement.href = `/board/community/update/` + `${bIdx}`;
    aElement.innerHTML = 'Edit';
    upElement.appendChild(aElement);

    const response = await axios.post(`/view/${bIdx}`, {
        withCredentials: true,
    });
    const showCategory = response.data.result[0].show_category_idx

    if (response.data.errno === 0) {
        const [{ board_subject, board_date, board_hit, board_content, board_file_idx }] = response.data.result;
        const writer_nickname =response.data.result[0].user_nickname;

        
        switch (showCategory) {
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

        boardIdx.innerHTML = bIdx;
        subject.innerHTML = board_subject;
        nickname.innerHTML = writer_nickname;
        date.innerHTML = board_date;
        hit.innerHTML = board_hit;
        content.innerHTML = board_content;

        if (board_file_idx > 0) {
            const fileDataUrl = localStorage.getItem("file")
            const imgBox = document.querySelector("#img")
            const imgg = document.createElement('img');
            imgg.src = fileDataUrl

            imgBox.appendChild(imgg)
        }

    } else {

    };

    const deleteFrm = document.querySelector('#deleteFrm');
    deleteFrm.addEventListener('submit',
        async function deleteSubmit(e) {
            e.preventDefault();
            const uidx = e.target.parentNode.querySelector('input[id=useridx]').value
            if(user.user_idx != uidx){
                
            }
            
            try {

                await axios.post(`/delete/${bIdx}`);
                location.href = '/board/community/list';
            } catch (e) {
                console.log('communityviewdlt', e.message)
                alert('try again');
            };

        });


    const boardiidx = bIdx;
    const commentBox = document.querySelector('#commentBox')
    const commentForm = document.querySelector('#commentForm') //템플릿
    const commentList = document.querySelector('#commentList')  //템플릿
    const commentInput = document.querySelector('#commentInput') //업데이트??

    const replay = [];
    commentBox.appendChild(commentForm);
    function createForm() {
        const clone = document.importNode(commentForm.content, true);
        const writeRow = clone.querySelector('#writeRow');
        const form = clone.querySelector('form');
        commentBox.appendChild(writeRow);
        form.addEventListener('submit', submitHandler);
    }


    async function submitHandler(e) {
        e.preventDefault();
        const { hello } = e.target;

        const body = {
            user: user,
            ccontent: hello.value,
            userIdx: user.user_idx,
            user_nickname: user.user_nickname,
            cmt_date: '2022-04-04'
        };
        replay.push(body);

        try {
            const insert = await axios.post(`/comment/${boardiidx}`, body);
            location.href = `/board/community/view/${bIdx}`;
        } catch (e) {
            console.log('/communityviewcmt', e.message);
        }

        hello.value = '';
        CommentList();
    }

    async function CommentList() {
        const responseList = await axios.post(`/commentList/${boardiidx}`);
        const {cmtList} = responseList.data;
        commentBox.innerHTML = '';
        createForm();

        const count = document.querySelector('details summary span');
        count.innerHTML = `(${cmtList.length})`;

        // 
        cmtList.forEach(v => {
            const row = document.importNode(commentList.content, true);
            const commentContent = row.querySelector('.commentContent');
            const writerInfo = row.querySelectorAll('.commentRow > .writerInfo > span');
            if (v.cmt_update_flag === 1) {
                const spanElement = document.createElement('span');
                spanElement.innerHTML = v.cmt_content;
                spanElement.addEventListener('click', updateHandler);
                const deleteBtn = commentContent.querySelector('.commentDeleteBtn');
                deleteBtn.addEventListener('click', deleteHandler);
                commentContent.prepend(spanElement);
            } else {
                const clone = document.importNode(commentInput.content, true);
                clone.querySelector('input').value = v.cmt_content;
                // clone.querySelector('input').addEventListener('keypress',updateSubmitHandler)
                row.prepend(clone);
            }
            commentContent.querySelector('input[id=cidx]').value = v.cmt_idx;
            commentContent.querySelector('input[id=uidx]').value = v.user_idx;
            //
            writerInfo[0].innerHTML = v.user_nickname;
            writerInfo[1].innerHTML = v.cmt_date;

            commentBox.appendChild(row);
        })

        try {
            await axios.post(`/commentList/${boardiidx}`);
        } catch (e) {
            console.log('/communityviewcmtlist', e.message);
        }
    }

    async function deleteHandler(e) {
        const uidx = e.target.parentNode.querySelector('input[id=uidx]').value;
        if (user.user_idx != uidx) {
            const commentContent = e.target.parentNode;
            const msgBox = document.createElement('span');
            const msg = document.createElement('p');
            msg.style.color='brown';
            msg.innerHTML = '본인이 작성한 댓글만 삭제 가능합니다';
            msgBox.appendChild(msg);
            commentContent.appendChild(msgBox);
            throw new Error('댓글 작성자 아님');
        }
        const cmtidx = e.target.parentNode.querySelector('input').value;
        try {
            const test = await axios.post(`/commentListDlt/${cmtidx}`);
            location.href = `/board/community/view/${bIdx}`;
        } catch (e) {
            console.log('/cmtdelete', e.message);
        }
    }

    async function updateHandler(e) {
        const uidx = e.target.parentNode.querySelector('input[id=uidx]').value;
        if (user.user_idx != uidx) {
            const commentContent = e.target.parentNode;
            const msgBox = document.createElement('span');
            const msg = document.createElement('p');
            msg.style.color='brown';
            msg.innerHTML = '본인이 작성한 댓글만 수정 가능합니다';

            msgBox.appendChild(msg);
            commentContent.appendChild(msgBox);
            throw new Error('댓글 작성자 아님');
        }
        const cmtidx = e.target.parentNode.querySelector('input[id=cidx]').value;

        const commentInput = document.querySelector('#commentInput');
        const clone = document.importNode(commentInput.content, true);
        const Frm = clone.querySelector('form');
        Frm[0].cmt_update_Flag = 0;
        e.target.parentNode.prepend(clone);


        Frm.addEventListener('submit', commentSubmitHandler);

        async function commentSubmitHandler(e) {
            e.preventDefault();
            const updateComment = (e.target[0]).value;
            const data = {
                updateComment,
            };
            try {
                const response = await axios.post(`/commentListUp/${cmtidx}`, data);
                console.log(response)
                // if (response.data.errno !== 0) throw new Error;
                location.href = `/board/community/view/${bIdx}`;
            } catch (e) {
                console.log('/commentlistUp', e.message);
            }
        }
    }
    CommentList();
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

    // const check=JSON.parse(localStorage.getItem("file"));
    // // console.log(check)
    // const src = document.querySelector('#src');
    // src.addEventListener('load',getDataUrl)
    // function getDataUrl(img){
    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext("2d");
    //     canvas.width = src.width;
    //     canvas.height = src.height;
    //     ctx.drawImage(src,0,0);

    //     check.src = canvas.toDataURL('image/*');
    // }

     // file 가지고 오기
    // const imgName = response.data.result[0].file_storedname
    // const imgN = response.data.result[0].file
    // const fileImg = document.createElement('img');
    // fileImg.src = `/uploads/c_uploads/${imgName}`
    // console.log(fileImg.src) 