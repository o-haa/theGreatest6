

document.addEventListener('DOMContentLoaded', init);
let updateFlag = true
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
        const [{board_subject,board_date,board_hit,board_content,board_file_idx}]=response.data.result;
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

        boardIdx.innerHTML = idx;
        subject.innerHTML = board_subject;
        nickname.innerHTML = user_nickname
        date.innerHTML = board_date;
        hit.innerHTML = board_hit;
        content.innerHTML = board_content;
        
        if(board_file_idx > 0){
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
    async function deleteSubmit (e){
        e.preventDefault();

        try{
            await axios.post(`/delete/${idx}`);
            location.href='/board/community/list';
        } catch(e){
            console.log('communityviewdlt',e.message)
            alert('try again');
        };
        
    });

   
    const boardiidx = idx
    const commentBox = document.querySelector('#commentBox>ul')
    const commentForm = document.querySelector('#commentForm')
    const commentList = document.querySelector('#commentList')
    const commentInput = document.querySelector('#commentInput')
    
    const replay = []
    commentBox.appendChild(commentForm)
    function createForm () {
        const clone = document.importNode(commentForm.content,true)
        const form = clone.querySelector('form')
        commentBox.appendChild(clone)
        form.addEventListener('submit',submitHandler)
    }

   
    async function submitHandler(e){
        e.preventDefault()
        const {hello} = e.target
        
        
        const body = {
            user:user,
            ccontent:hello.value,
            userIdx: user.user_idx,
            user_nickname:user_nickname,
            cmt_date:'2022-04-04'
        }

        replay.push(body)
       
       
       try{
        const insert = await axios.post(`/comment/${boardiidx}`,body)
        location.href=`/board/community/view/${idx}`
       }catch(e){
           console.log('/communityviewcmt',e.message)
       }
    
       hello.value=''
       CommentList()
    }

    async function CommentList(){
        const responseList = await axios.post(`/commentList/${boardiidx}`)
        const cmtList = responseList.data.cmtListResult
        commentBox.innerHTML=''
        createForm()

        const count = document.querySelector('details summary span')
        count.innerHTML = `(${cmtList.length})`
        
        
        cmtList.forEach(v=>{
            const clone = document.importNode(commentList.content,true)
            const row = clone.querySelector('.commentContent')
            const roww = clone.querySelectorAll('.commentContent+li>span')
            
            if(v.cmt_update_flag === 1){
                const spanElement = document.createElement('span')
                spanElement.innerHTML = v.cmt_content
                spanElement.addEventListener('click',updateHandler)
                const deleteBtn = row.querySelector('.commentDeleteBtn')
                deleteBtn.addEventListener('click',deleteHandler)
                row.prepend(spanElement)
            }else {
                const clone = document.importNode(commentInput.content,true)
                clone.querySelector('input').value = v.cmt_content
                // clone.querySelector('input').addEventListener('keypress',updateSubmitHandler)
                row.prepend(clone)
                
            }

            row.querySelector('input').value = v.cmt_idx
            
            roww[0].innerHTML=user_nickname
            roww[1].innerHTML=v.cmt_date

            commentBox.appendChild(clone)
            
        })
        
        try{
            await axios.post(`/commentList/${boardiidx}`)        
        } catch(e){
            console.log('/communityviewcmtlist',e.message)
        }
    }

    async function deleteHandler(e){
        const cmtidx = e.target.parentNode.querySelector('input').value
        try{
            const test = await axios.post(`/commentListDlt/${cmtidx}`)   
            location.href=`/board/community/view/${idx}`
        } catch (e){
            console.log('/cmtdelete',e.message)
        }       
    }
    
    async function updateHandler(e){
        
        const responseList = await axios.post(`/commentList/${boardiidx}`)
        const cmtlist = responseList.data.cmtListResult
        const cmtidx = e.target.parentNode.querySelector('input').value
        
        const newarr = [...cmtlist]
        
        for(let i=0; i<newarr.length; i++){
            if(newarr[i].cmt_idx === cmtidx){
                newarr[i].cmt_update_flag = 0
                console.log(newarr[i])
            }
        }
        // console.log(index)
        // newarr[index].cmt_update_flag = 0
        // console.log(cmtidx, newarr)
        
        
    
        CommentList()     
    }


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