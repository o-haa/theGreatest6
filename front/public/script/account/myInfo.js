document.addEventListener('DOMContentLoaded', init);


//인잇
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/account/management/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials= true;

    const requiredInfo = document.querySelectorAll('.infoValue');
    try {
        //유저 필수 정보 렌더하기 위해 가져오기
        const response = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
        const { user } = response.data.result;

        requiredInfo[0].innerHTML = user.user_id;
        requiredInfo[1].innerHTML = user.user_nickname;
        requiredInfo[2].innerHTML = user.user_doj;
        requiredInfo[3].innerHTML = user.user_level;

        const userLevel = document.querySelector('#userLevel');
        const userName = document.querySelector('#userName');

        userLevel.innerHTML = user.user_level;
        userName.innerHTML = user.user_nickname;

        const data = {
            userIdx : user.user_idx
        };
        //유저 선택 정보 렌더하기 위해 백엔드에 요청
        try{

            const optionalValue = await axios.post('/myinfo', data)
            console.log(optionalValue.data.errno)


            //만약 백엔드 응답에서 데이터가 없으면 인풋박스가 렌더됨
            if (optionalValue.data.errno == 0) {

                console.log('데이터 없으면 실행됨')
                const optionalOff = document.querySelector('#off')
                // const offBox = document.importNode(optionalOff.content, true)
                const userOptionFrm = document.querySelector('#userOptionFrm')

                userOptionFrm.addEventListener('submit',submitHandler)
                
                async function submitHandler(e){
                    e.preventDefault();
                    
                    const usertName = document.querySelector('#userName').value
                    const inputDob = document.querySelectorAll('.userDob')
                    const userGender = document.querySelector('input[type=radio]')
                    const inputsMobile = document.querySelectorAll('.userMobile')
                    const userAddress = document.querySelectorAll('#userAddress').value

                    inputDob.forEach(v=> {
                        console.log(v.value)
                        
                    });

                    inputsMobile.forEach(v=> {
                        console.log(v.value)
                        
                    });


                    console.log(userName, userGender,userAddress)

                    // const data = {
                    //     userName,
                    //     userDob,
                    //     userGender,
                    //     userMobile
                    // }


                    try{
                        // const optionalInputs = clone.querySelectorAll('input').value
                        const body = {

                        }

                        const response2 = await axios.post('/',body)
                    } catch (e){

                    }

                }


            } else {
                console.log('데이터 있으면 실행됨')
                // const optionalOn = document.querySelector('#on')
                // const onBox = document.importNode(optionalOn.content, true)
                // console.log(optionalOn)
                // console.log(onBox)
            }
        } catch (e) {
            console.log(e)
        }
        //name
        //dob
        //gender
        //mobile
        //address
        

    }
    catch (e) {
        console.log(e);
    }

}

