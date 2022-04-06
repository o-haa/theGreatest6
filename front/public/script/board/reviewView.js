

document.addEventListener('DOMContentLoaded', init);
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/community';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = response1.data.result;
    const user_nickname = user.user_nickname;

    const [, , , , idx] = location.pathname.split('/');
    const boardIdx = document.querySelector('#idx');
    const category = document.querySelector('#category')
    const subject = document.querySelector('#subject');
    const nickname = document.querySelector('#writer');
    const date = document.querySelector('#date');
    const content = document.querySelector('#bContent');
    const hit = document.querySelector('#hit');

    const upElement = document.querySelector('#update');
    const aElement = document.createElement('a');
    aElement.href = `/board/community/update/` + `${idx}`;
    aElement.innerHTML = 'Edit';
    upElement.appendChild(aElement);

    const response = await axios.post(`/view/${idx}`, {
        withCredentials: true,
    });

    const showCategory = response.data.result[0].show_category_idx

    if (response.data.errno === 0) {
        const [{ board_subject, board_date, board_hit, board_content, board_file_idx }] = response.data.result;
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

        boardIdx.innerHTML = idx;
        subject.innerHTML = board_subject;
        nickname.innerHTML = user_nickname
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

            try {
                await axios.post(`/delete/${idx}`);
                location.href = '/board/community/list';
            } catch (e) {
                console.log('communityviewdlt', e.message)
                alert('try again');
            };

        });


    const boardiidx = idx
    const commentBox = document.querySelector('#commentBox')
    const commentForm = document.querySelector('#commentForm') //템플릿
    const commentList = document.querySelector('#commentList')  //템플릿
    const commentInput = document.querySelector('#commentInput') //업데이트??

    const replay = []
    commentBox.appendChild(commentForm)
    function createForm() {
        const clone = document.importNode(commentForm.content, true)
        const writeRow = clone.querySelector('#writeRow')
        const form = clone.querySelector('form')
        commentBox.appendChild(writeRow)
        form.addEventListener('submit', submitHandler)
    }


    async function submitHandler(e) {
        e.preventDefault()
        const { hello } = e.target

        const body = {
            user: user,
            ccontent: hello.value,
            userIdx: user.user_idx,
            user_nickname: user_nickname,
            cmt_date: '2022-04-04'
        }

        replay.push(body)
        // 

        try {
            const insert = await axios.post(`/comment/${boardiidx}`, body)
            location.href = `/board/community/view/${idx}`
        } catch (e) {
            console.log('/communityviewcmt', e.message)
        }

        hello.value = '';
        CommentList()
    }

    async function CommentList() {
        const responseList = await axios.post(`/commentList/${boardiidx}`)
        const cmtList = responseList.data.result
        commentBox.innerHTML = ''
        createForm()

        const count = document.querySelector('details summary span')
        count.innerHTML = `(${cmtList.length})`

        // 
        cmtList.forEach(v => {
            const row = document.importNode(commentList.content, true)
            const commentContent = row.querySelector('.commentContent')
            const writerInfo = row.querySelectorAll('.commentRow > .writerInfo > span')
            if (v.cmt_update_flag === 1) {
                const spanElement = document.createElement('span')
                spanElement.innerHTML = v.cmt_content
                spanElement.addEventListener('click', updateHandler)
                const deleteBtn = commentContent.querySelector('.commentDeleteBtn')
                deleteBtn.addEventListener('click', deleteHandler)
                commentContent.prepend(spanElement)
            } else {
                const clone = document.importNode(commentInput.content, true)
                clone.querySelector('input').value = v.cmt_content
                // clone.querySelector('input').addEventListener('keypress',updateSubmitHandler)
                row.prepend(clone)
            }

            commentContent.querySelector('input[id=cidx]').value = v.cmt_idx
            commentContent.querySelector('input[id=uidx]').value = v.user_idx



            //

            writerInfo[0].innerHTML = v.user_nickname
            writerInfo[1].innerHTML = v.cmt_date

            commentBox.appendChild(row)
        })

        try {
            await axios.post(`/commentList/${boardiidx}`)
        } catch (e) {
            console.log('/communityviewcmtlist', e.message)
        }
    }

    async function deleteHandler(e) {
        const uidx = e.target.parentNode.querySelector('input[id=uidx]').value
        if (user.user_idx != uidx) {
            const commentContent = e.target.parentNode
            const msg = document.createElement('span')
            msg.style.color='brown';
            msg.innerHTML = '본인이 작성한 글만 삭제 가능합니다'

            commentContent.appendChild(msg)
            throw new Error('댓글 작성자 아님')
        }
        const cmtidx = e.target.parentNode.querySelector('input').value
        try {
            const test = await axios.post(`/commentListDlt/${cmtidx}`)
            location.href = `/board/community/view/${idx}`
        } catch (e) {
            console.log('/cmtdelete', e.message)
        }
    }

    async function updateHandler(e) {
        const uidx = e.target.parentNode.querySelector('input[id=uidx]').value
        if (user.user_idx != uidx) {
            const commentContent = e.target.parentNode
            const msg = document.createElement('span')
            msg.style.color='brown';
            msg.innerHTML = '본인이 작성한 글만 수정 가능합니다'

            commentContent.appendChild(msg)
            throw new Error('댓글 작성자 아님')
        }
        const cmtidx = e.target.parentNode.querySelector('input[id=cidx]').value

        const commentInput = document.querySelector('#commentInput')
        const clone = document.importNode(commentInput.content, true)
        const Frm = clone.querySelector('form')
        Frm[0].cmt_update_Flag = 0
        e.target.parentNode.prepend(clone)


        Frm.addEventListener('submit', commentSubmitHandler)

        async function commentSubmitHandler(e) {
            e.preventDefault()
            const updateComment = (e.target[0]).value
            const data = {
                updateComment,
            }

            try {
                const response = await axios.post(`/commentListUp/${cmtidx}`, data)
                if (response.data.errno !== 0) throw new Error
                console.log(response.data)
                location.href = `/board/community/view/${idx}`
            } catch (e) {
                console.log('/communityview', e.message)
            }
        }
        // newarr[index].cmt_update_flag = 0
        // console.log(cmtidx, newarr)

    }













    // CommentList()     


    CommentList()




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