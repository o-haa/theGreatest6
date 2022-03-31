document.addEventListener('DOMContentLoaded', init)
document.addEventListener('keydown',noEnterkey)

async function noEnterkey(e){
    if (e.keyCode === 13) {
        e.preventDefault();
      };
}

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    makeOption()

    const writeForm = document.querySelector('#writeForm');
    writeForm.addEventListener('submit',makeData)

    async function makeData(e){
        e.preventDefault();
        const data = {
            category : document.querySelector('#category').value,
            xrated : document.querySelector('#category').value,
            title : document.querySelector('#title').value,
            place : document.querySelector('#place').value,
            showCast1 : document.querySelector('#showCast1').value,
            showCast2 : document.querySelector('#showCast2').value,
            showDirector : document.querySelector('#showDirector').value,
            showCompany : document.querySelector('#showCompany').value,
            showContent : document.querySelector('#showContent').value,
            ticketMonth : document.querySelector('#ticketMonth').value,
            ticketDate : document.querySelector('#ticketDate').value,
            ticketHour : document.querySelector('#ticketHour').value,
            showMonth : document.querySelector('#showMonth').value,
            showDate : document.querySelector('#showDate').value,
            showHour : document.querySelector('#showHour').value
        }
<<<<<<< HEAD
        const response = await axios.post('showwrite',data)
        const show_idx = response.data.resultShow.insertId
        location.href = `showview/${show_idx}`
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