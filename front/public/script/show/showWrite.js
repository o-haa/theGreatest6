document.addEventListener('DOMContentLoaded', init)
document.addEventListener('keydown',noEnterkey)

async function noEnterkey(e){
    if (e.keyCode === 13) {
        e.preventDefault();
      };
}

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios.defaults.withCredentials= true;
    
    makeOption()
    
    const writeForm = document.querySelector('#writeForm');
    //input의 name값 upload가 인자로 들어감
    const file = document.querySelector('#upload');
    writeForm.addEventListener('submit',makeData)
    
    async function makeData(e){
        e.preventDefault();
        
        console.log('file.value : ',file.value)// C:\fakepath\1.png
        console.log('file.files[0] : ',file.files[0]) //파일정보

        const formData = new FormData()
            formData.append('upload',file.files[0])
            formData.append('category', document.querySelector('#category').value)
            formData.append('xrated' , document.querySelector('#xrated').value)
            formData.append('title' , document.querySelector('#title').value)
            formData.append('place' , document.querySelector('#place').value)
            formData.append('showCast1' , document.querySelector('#showCast1').value)
            formData.append('showCast2' , document.querySelector('#showCast2').value)
            formData.append('showDirector' , document.querySelector('#showDirector').value)
            formData.append('showCompany' , document.querySelector('#showCompany').value)
            formData.append('showContent' , document.querySelector('#showContent').value)
            formData.append('showMonth' , document.querySelector('#showMonth').value)
            formData.append('showDate' , document.querySelector('#showDate').value)
            formData.append('showHour' , document.querySelector('#showHour').value)
            formData.append('ticketMonth' , document.querySelector('#ticketMonth').value)
            formData.append('ticketDate' , document.querySelector('#ticketDate').value)
            formData.append('ticketHour' , document.querySelector('#ticketHour').value)

        try{
            console.log('check')
            const response = await axios.post('showwrite',formData)
            let idx = response.data.result.insertShowId
            // window.location.href = `/show/program/showview/${idx}`
            console.log('마지막 : ',response)
        }
        catch(e){
            console.log('/showwrite',e.message) //네트워크 에러 생겨서 여기 출력
        }
    }

    function makeOption(){
        //예매일
        const ticketMonth = document.querySelector('#ticketMonth')
        const ticketDate = document.querySelector('#ticketDate')
        const ticketHour = document.querySelector('#ticketHour')
        //공연일
        const showMonth = document.querySelector('#showMonth')
        const showDate = document.querySelector('#showDate')
        const showHour = document.querySelector('#showHour')

        //예매일, 공연일 생성
        makeDatelist(showMonth,showDate,showHour)
        makeDatelist(ticketMonth,ticketDate,ticketHour)
    }
    
    //드롭다운 만드는 함수
    function makeDatelist(month,date,hour){
        //달력배열을 만들 배열 선언
        let monthlist=[] 
        let datelist=[]
        let hourlist=[]
        
        for(let i=1; i<=12; i++){ monthlist.push(`${i}`) ;} //열두달 채워넣기
        for(let i=1; i<=31; i++){ datelist.push(`${i}`) ;} //31일 채워넣기
        hourlist = ['10','13','18'] //3회 공연

        monthlist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`
            month.options.add(newOption)
        })

        datelist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`
            date.options.add(newOption)
        })

        hourlist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`
            hour.options.add(newOption)
        })

        return month,date,hour
    }
    
}
