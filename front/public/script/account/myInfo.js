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
                    
                    const userName = document.querySelector('#userNameInput').value
                    const inputDob01 = document.querySelector('#userDob01').value
                    const inputDob02 = document.querySelector('#userDob02').value
                    const inputDob03 = document.querySelector('#userDob03').value
                    const userDob = inputDob01+inputDob02+inputDob03

                    const userGender = document.querySelector('input[name=userGender]:checked').value
                    const inputsMobile01 = document.querySelector('#userMobile01').value
                    const inputsMobile02 = document.querySelector('#userMobile02').value
                    const inputsMobile03 = document.querySelector('#userMobile03').value
                    const userMobile = inputsMobile01+inputsMobile02+inputsMobile03;
                    const userAddress = document.querySelectorAll('#userAddress').value

                    let today = new Date()
                    let year = today.getFullYear()

                    const expYear = new RegExp(`/^(?=.*[1900-${year}]).{2}$/;`, "g") 
                    const expMonth = /^(?=.*[01-12]).{2}$/;
                    const expDay = /^(?=.*[01-31]).{2}$/;
                    const exp010 = /^(?=.*[010]).{3}$/;
                    const expMobile = /^(?=.*[0000-9999]).{4}$/;

                    try{
                    expYear.test(inputDob01)
                    expMonth.test(inputDob02)
                    expDay.test(inputDob03)
                    exp010.test(inputsMobile01)
                    expMobile.test(inputsMobile02,inputsMobile03)


                    const data = {
                        userName,
                        userDob,
                        userGender,
                        userMobile,
                        userAddress
                    }
                        const response2 = await axios.post('/optionalInfo',data)
                        console.log(response2.data)

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

