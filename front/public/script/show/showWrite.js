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
        //단순화 시켜서 다시 시작하기
        console.log('프론트')
        
        // const {upload} = e.target
        //req.file에 데이터가 담김
        console.log('file.value : ',file.value)// C:\fakepath\1.png
        console.log('file.files[0] : ',file.files[0]) //파일정보

        const formData = new FormData()
            formData.append('upload',file.files[0])
            //헤더 바뀜!!!

        try{
            //formData를 넣은 순간부터 막힘.
            const response = await axios.post('showwrite',formData)
            console.log('마지막 : ',response)
        }
        catch(e){
            console.log(e) //네트워크 에러 생겨서 여기 출력
        }
    }

    function makeOption(){
        const ticketMonth = document.querySelector('#ticketMonth')
        const ticketDate = document.querySelector('#ticketDate')
        const ticketHour = document.querySelector('#ticketHour')
        const showMonth = document.querySelector('#showMonth')
        const showDate = document.querySelector('#showDate')
        const showHour = document.querySelector('#showHour')
        const timestamp = `DATE_FORMAT (show_date, %Y-%m-%d %h:%i) AS show_date`

        let monthlist=[] 
        let datelist=[]
        let timelist=[]

        for(let i=1; i<=12; i++){ monthlist.push(`${i}`) ;}
        for(let i=1; i<=31; i++){ datelist.push(`${i}`) ;}
        timelist = ['10','13','18']

        monthlist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            if(v<10){ newOption.value = `${v}` }
            else { newOption.value = `${v}` }
            ticketMonth.options.add(newOption)
        })

        datelist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`    
            ticketDate.options.add(newOption)
        })

        timelist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`    
            ticketHour.options.add(newOption)
        })
        
        monthlist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            if(v<10){ newOption.value = `${v}` }
            else { newOption.value = `${v}` }
            showMonth.options.add(newOption)
        })
    
        datelist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`    
            showDate.options.add(newOption)
        })
    
        timelist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`    
            showHour.options.add(newOption)
        })
    }
}