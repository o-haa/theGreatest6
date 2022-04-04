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
    console.log('도착')

    let [,,,,idx] = location.pathname.split('/')

    const response = await axios.post(`showmodify/${idx}`)
    console.log(response.data.result[0])

    const {show_idx, show_category_idx, show_xrated, show_title, show_place, show_cast1, show_cast2, show_director,show_company,show_content,show_date} = response.data.result[0]
    
    showSplit = show_date.split('T')
    showYMD = showSplit[0].split('-')
    showMonth = showYMD[1]
    showDate = showYMD[2]
    showHour = showSplit[1].slice(0,2)
    console.log(showMonth)
    // const {ticketMonth,ticketDate,ticketHour}

    document.querySelector('#category').value = show_category_idx
    document.querySelector('#xrated').value = show_xrated
    document.querySelector('#title').value = show_title
    document.querySelector('#place').value = show_place
    document.querySelector('#showCast1').value = show_cast1
    document.querySelector('#showCast2').value = show_cast2
    document.querySelector('#showDirector').value = show_director
    document.querySelector('#showCompany').value = show_company
    document.querySelector('#showContent').value = show_content
    document.querySelector('#ticketMonth').value
    document.querySelector('#ticketDate').value
    document.querySelector('#ticketHour').value
    document.querySelector('#showMonth option').innerHTML = showMonth
    document.querySelector('#showDate option').innerHTML = showDate
    document.querySelector('#showHour option').innerHTML = showHour

    makeOption()

    try{
        const modifyForm = document.querySelector('#modifyForm')
        modifyForm.addEventListener('submit',modifyFormHandler)
        async function modifyFormHandler(e){
            e.preventDefault()
            window.location.href = `/show/program/showview/${idx}`
        }
    }catch(e){
        console.log('/showmodify', e.message)
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
