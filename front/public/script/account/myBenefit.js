document.addEventListener('DOMContentLoaded', init);
let user;

//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/management/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    //템플릿
    const tableBox = document.querySelector('#tableBox');
    const requiredOn = document.querySelector('#requiredOn')  //필수 정보
    const whiteBlock = document.querySelector('#prevent')   //블로킹
    const userOptionFrm = document.querySelector('#optionalOff')    //유저 선택 정보 없는 경우
    const optionalBox = document.querySelector('#optionalOn')  //유저 선택 정보 있는 경우
    const benefitOn = document.querySelector('#benefitOn')

    const checked = document.querySelectorAll('#itemBox input');
    checked.forEach(v => v.addEventListener('click', checkedHandler));

    async function checkedHandler(e) {
        const showMetheScreen = e.target.id;
        switch (showMetheScreen) {
            case 'myProfile':
                location.href = '/account/management/myInfo';
                break;
            case 'myCalendar':
                location.href = '/account/management/mycalendar';
                break;
            case 'myBenefit':
                location.href = '/account/management/mybenefit';
                break;
            case 'myPick':
                // myPick()
                location.href = '/account/management/mypick';
                break;
            case 'myTicket':
                // myTicket()
                location.href = '/account/management/myticket';
                break;
        }
    }

    try{
        const response = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
        user = response.data.result.user;

        //유저 정보 불러와서 렌더하기
        const userLevel = document.querySelector('#userLevel');
        const userName = document.querySelector('#userName');
        const signOut = document.querySelector('#signOut');

        userLevel.innerHTML = user.user_level;
        userName.innerHTML = user.user_nickname;
        signOut.innerHTML = 'Sign Out';

        signOut.addEventListener('click',signOutHandler);
        async function signOutHandler(){
            const response = await axios.post('http://localhost:3001/account/member/destroycookie',null);
            console.log(response.data);
            location.href='/';
        }


        //포인트 정보 불러와서 렌더하기
        const tbody = document.querySelector('tbody');
        const potintTable = document.querySelector('#pointTable');

        const data = {
            userIdx : user.user_idx
        };
        const responseBenefit = await axios.post('/mybenefit',data);
        console.log(responseBenefit.data);
        if(responseBenefit.data.errno !==0 )throw new Error;
        const point = responseBenefit.data.result;
        
        point.forEach(v=>{
            const pointRows = document.importNode(potintTable.content,true);
            const pointRow = pointRows.querySelectorAll('.pointRow');

            const btnAdd = pointRows.querySelector('.btnAdd')
            const btnEdit = pointRows.querySelector('.btnEdit')
            const btnFin = pointRows.querySelector('.btnFin')
            const btnDel = pointRows.querySelector('.btnDel')
            btnAdd.setAttribute("class","btnAdd off")
            btnEdit.setAttribute("class","btnEdit")
            btnEdit.addEventListener('click',editBtnHandler)
            btnFin.addEventListener('click',updateBtnHandler)
            btnDel.addEventListener('click',deleteBtnHandler)

            pointRow[0].innerHTML = v.u_point_idx;
            pointRow[1].innerHTML = v.u_point_date;
            pointRow[2].innerHTML = v.u_point_description;
            pointRow[3].innerHTML = v.u_point_in;
            pointRow[4].innerHTML = v.u_point_out;
            pointRow[5].innerHTML = v.u_point_net  ;
            tbody.appendChild(pointRows);
                })
                console.log(point)
            const balance = document.querySelectorAll('.tfoot > td');
                balance[3].innerHTML = point.u_point_in
                balance[4].innerHTML = point.u_point_out
                balance[5].innerHTML = point.u_point_net

        } catch (e){
            console.log('/mybenefit',e.message);
        }
    
        const pntInsertBtn = document.querySelector('.btnAdd')
        pntInsertBtn.addEventListener('click',insertBtnHandler)
        async function insertBtnHandler(e){
            const tdAddList = document.querySelectorAll('.inputRow')
            console.log('nnnnnnnn   ---> ',tdAddList)
            const pointDescription = tdAddList[0].value 
            const pointIn = tdAddList[1].value 
            const pointOut = tdAddList[2].value 
            const userIdx = user.user_idx

            try {
                const data = {
                    userIdx,
                    pointIn,
                    pointOut,
                    pointDescription,
                }
                const insertPoint = await axios.post('http://localhost:4001/admin/account/insertpoint', data)
                location.href = '/account/management/myBenefit'
                console.log(insertPoint.data)
            } catch (e) {
                console.log('/AdmBenefitMgt', e.message)
            }
        }
        
        async function editBtnHandler(e){
            const td = e.target.parentNode
            const parentNode = td.parentNode
            const tdlist = parentNode.querySelectorAll('td')
            for(let i=0; i<7; i++){
                tdlist[i].setAttribute("class","pointRow off")
            }

            for(let i=7; i<14; i++){
                tdlist[i].setAttribute("class","pointRow edit")
            }
            console.log(parentNode)
            
            const btnEdit = parentNode.querySelector('.btnEdit')
            btnEdit.setAttribute("class","btnEdit off")
            const btnFin = parentNode.querySelector('.btnFin')
            btnFin.setAttribute("class","btnFin")
        }

        async function updateBtnHandler(e){
            const td = e.target.parentNode
            const parentNode = td.parentNode
            const tdlist = parentNode.querySelectorAll('td')
            for(let i=0; i<7; i++){
                tdlist[i].setAttribute("class","pointRow")
            }
            
            for(let i=7; i<14; i++){
                tdlist[i].setAttribute("class","pointRow edit off")
            }
            const pointIdx = tdlist[1].innerHTML
            const inputList = parentNode.querySelectorAll('input')
            console.log('bbbbbbb', inputList)
            const pointDescription = inputList[0].value 
            const pointIn = inputList[1].value 
            const pointOut = inputList[2].value 
            // const userIdx = user.user_idx
            
            try {
                const data = {
                    pointIdx,
                    pointIn,
                    pointOut,
                    pointDescription,
                }
                console.log(data)
                const updatePoint = await axios.post('http://localhost:4001/admin/account/updatepoint', data)
                console.log(updatePoint.data)
                location.href = '/account/management/myBenefit'
            } catch (e) {
                console.log('/AdmBenefitMgt', e.message)
            }

            const btnEdit = parentNode.querySelector('.btnEdit')
            btnEdit.setAttribute("class","btnEdit")
            const btnFin = parentNode.querySelector('.btnFin')
            btnFin.setAttribute("class","btnFin off")
        }

        async function deleteBtnHandler(e){
            const td = e.target.parentNode
            const parentNode = td.parentNode
            const tdList = parentNode.querySelectorAll('td')
            const pointIdx = tdList[1].innerText
            console.log('a  ----->',pointIdx)
            try {
                const data = {
                    pointIdx,
                }
                const deletePoint = await axios.post('http://localhost:4001/admin/account/deletepoint', data)
                console.log(deletePoint.data)
                location.href = '/account/management/myBenefit'
            } catch (e) {
                console.log('/AdmBenefitMgt', e.message)
            }
        }

}