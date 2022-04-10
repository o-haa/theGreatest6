document.addEventListener('DOMContentLoaded', init);
let user;
let userAddress = {}

//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/management/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    //템플릿
    const maincal = document.querySelector('#maincal');
    const tableBox = document.querySelector('#tableBox');
    const whiteBlock = document.querySelector('#prevent');   //블로킹
    const userOptionFrm = document.querySelector('#optionalOff');    //유저 선택 정보 없는 경우
    const optionalBox = document.querySelector('#optionalOn');  //유저 선택 정보 있는 경우



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



    const requiredInfo = document.querySelectorAll('.infoValue');
    try {
        //유저 필수 정보 렌더하기 위해 가져오기 ok
        const response = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
        user = response.data.result.user;

        requiredInfo[0].innerHTML = user.user_id;
        requiredInfo[1].innerHTML = user.user_nickname;
        requiredInfo[2].innerHTML = user.user_doj;
        requiredInfo[3].innerHTML = user.user_level;

        const userLevel = document.querySelector('#userLevel');
        const userName = document.querySelector('#userName');


        userLevel.innerHTML = user.user_level;
        userName.innerHTML = user.user_nickname;

        const data = {
            userIdx: user.user_idx
        };
        //유저 선택 정보 렌더하기 위해 백엔드에 요청
        try {
            const optionalValue = await axios.post('/myinfo', data)

            //만약 백엔드 응답에서 데이터가 없으면 인풋박스가 렌더됨
            if (optionalValue.data.errno !== 0) {
                console.log('데이터 없으면 실행됨')
                // const whiteBlock = document.querySelector('#prevent')
                const block = document.importNode(whiteBlock.content, true)
                const insertInfo = block.querySelector('#insertInfo')
                const insertCheck = insertInfo.querySelector('#insertCheck')
                // const tableBox = document.querySelector('#tableBox')
                // const userOptionFrm = document.querySelector('#optionalOff')
                const optionalOffClone = document.importNode(userOptionFrm.content, true)
                const submitFrm = optionalOffClone.querySelector('#userOptionFrm')
                const submitBtn = optionalOffClone.querySelector('#submitBtn')
                tableBox.appendChild(block)

                insertCheck.addEventListener('change', insertBtnHandler)

                function insertBtnHandler() {
                    insertInfo.style.display = 'none';
                    submitBtn.style.display = 'inline-block';

                    //주소등록
                    const kakaoAddress = document.querySelector('#kakaoAddress')
                    kakaoAddress.addEventListener('click', getUserAddress)
                }
                //폼 서브밋

                submitFrm.addEventListener('submit', submitHandler)
                tableBox.appendChild(optionalOffClone)

            } else {
                //유저 데이터 있는 경우 유저 정보가 렌더됨
                // const optionalBox = document.querySelector('#optionalOn')
                const optionalOnClone = document.importNode(optionalBox.content, true)
                const userOption = optionalValue.data.result

                const optionalInfo = optionalOnClone.querySelectorAll('.infoValue')
                userOption.filter(v => {
                    console.log(v)
                    if (v.user_gender === 0) v.user_gender = "여성";
                    else v.user_gender = "남성";
                    optionalInfo[0].innerHTML = v.u_name
                    optionalInfo[1].innerHTML = v.u_dob
                    optionalInfo[2].innerHTML = v.u_gender
                    optionalInfo[3].innerHTML = `${v.u_mobile1} - ${v.u_mobile1} - ${v.u_mobile3}`
                    optionalInfo[4].innerHTML = v.u_add_name + v.u_add_bd_name + v.u_add_detail
                })
                const tableBox = document.querySelector('#tableBox')
                tableBox.appendChild(optionalOnClone)
            }
        } catch (e) {
            console.log('유저 선택 정보 렌더 에러', e)
        }
    } catch (e) {
        console.log('유저 필수 정보 렌더 에러', e)
    }
}


async function getUserAddress() {
    let keyAddress = document.querySelector('#keyAddress');
    const data = {
        keyAddress:keyAddress.value
    };
    try {
        const response = await axios.post('http://localhost:5001/address/kakao', data)
        const address = response.data.result[0].road_address
        if (response.data.errno !== 0) throw new Error('카카오 주소 불러오기 오류')
        userAddress = {
            u_add_name: address.address_name,
            u_add_region1: address.region_1depth_name,
            u_add_region2: address.region_2depth_name,
            u_add_region3: address.region_3depth_name,
            u_add_road: address.road_name,
            u_add_bd_name: address.building_name,
            u_add_bd_no: address.main_building_no,
            u_add_detail: '',
            u_add_zipcode: address.zone_no,
        }
        const userAddressBox = document.querySelector('.userAddressBox')
        const spanElement = document.createElement('span')

        spanElement.id = 'userAdd'
        spanElement.innerHTML = userAddress.u_add_name
        spanElement.setAttribute('class','infoValue')
        userAddressBox.prepend(spanElement)

        console.log(userAddress)
        //값을 줬는데
        console.log(keyAddress.value)
        keyAddress.value='';
        keyAddress.setAttribute('placeholder','write details!')

    } catch (e) {
        console.log('/myinfo getAddress',e.message)
    }
}


async function submitHandler(e) {
    e.preventDefault();

    const userName = document.querySelector('#userNameInput').value;
    const inputDob01 = document.querySelector('#userDob01').value;
    const inputDob02 = document.querySelector('#userDob02').value;
    const inputDob03 = document.querySelector('#userDob03').value;
    const userDob = inputDob01 + inputDob02 + inputDob03;

    const userGender = document.querySelector('input[name=userGender]:checked').value;
    const mobile1 = document.querySelector('#userMobile01').value;
    const mobile2 = document.querySelector('#userMobile02').value;
    const mobile3 = document.querySelector('#userMobile03').value;

    const userMobile = { mobile1 ,mobile2, mobile3 };
    const u_add_detail = keyAddress.value
    userAddress = {
        ...userAddress,
        u_add_detail
    }    
    // let msg = document.querySelector('#msg');

    let today = new Date();
    let year = today.getFullYear();

    const expYear = await new RegExp(`/^(?=.*[1900-${year}]).{2}$/;`, "g");
    const expMonth = /^(?=.*[01-12]).{2}$/;
    const expDay = /^(?=.*[01-31]).{2}$/;
    const exp010 = /^(?=.*[010]).{3}$/;
    const expMobile = /^(?=.*[0000-9999]).{4}$/;

    const data = {
        userIdx: user.user_idx,
        userName,
        userDob,
        userGender,
        userMobile,
        userAddress
    };

    try {
        // if (
        //     await (!expYear.test(inputDob01))
        //     || await (!expMonth.test(inputDob02))
        //     || await (!expDay.test(inputDob03))
        //     || await (!exp010.test(inputsMobile01))
        //     || await (!expMobile.test(inputsMobile02))
        //     || await (!expMobile.test(inputsMobile03))
        // ) { throw new Error('입력 정보 확인') };

        const response2 = await axios.post('/optionalinfo', data);
        if (response2.data.errno !== 0) throw new Error('선택 정보 등록 에러');
        location.href = '/account/management/myinfo';
    } catch (e) {
        console.log('/myInfo', e);
    }
}

