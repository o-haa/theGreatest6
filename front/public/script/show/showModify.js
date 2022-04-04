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
    console.log('response.data.result[0]',response.data.result[0])

    const {show_idx, show_category_idx, show_xrated, show_title, show_place, show_cast1, show_cast2, show_director,show_company,show_content,show_date} = response.data.result[0]

    
    console.log(show_date)
    showSplit = show_date.split('T')
    showYMD = showSplit[0].split('-')
    showYear = showYMD[0]
    showMonth = showYMD[1]
    showDate = showYMD[2]
    showHour = showSplit[1].slice(0,2)

    //입력 받기 전 세팅
    document.querySelector('#category').value = show_category_idx
    document.querySelector('#xrated').value = show_xrated
    document.querySelector('#title').value = show_title
    document.querySelector('#place').value = show_place
    document.querySelector('#showCast1').value = show_cast1
    document.querySelector('#showCast2').value = show_cast2
    document.querySelector('#showDirector').value = show_director
    document.querySelector('#showCompany').value = show_company
    document.querySelector('#showContent').value = show_content
    console.log(document.querySelector('#showMonth'))
    // document.querySelector('#showMonth').innerHTML = showMonth
    // document.querySelector('#showDate').innerHTML = showDate
    // document.querySelector('#showHour').innerHTML = showHour

    makeOption()

    try{
        const modifyForm = document.querySelector('#modifyForm')
        modifyForm.addEventListener('submit',modifyFormHandler)
        async function modifyFormHandler(e){
            e.preventDefault()

            show_category_idx = document.querySelector('#category option').value
            console.log('아 왜 안들어가냐고',show_category_idx)
            // show_xrated = document.querySelector('#xrated').value
            // show_title = document.querySelector('#title').value
            // show_place = document.querySelector('#place').value
            // show_cast1 = document.querySelector('#showCast1').value
            // show_cast2 = document.querySelector('#showCast2').value
            // show_director = document.querySelector('#showDirector').value
            // show_company = document.querySelector('#showCompany').value
            // show_content = ocument.querySelector('#showContent').value
            // showMonth = document.querySelector('#showMonth').value
            // showDate = document.querySelector('#showDate').value
            // showHour = document.querySelector('#showHour').value
            let timestamp = `${showYear}-${showMonth}-${showDate}T${showHour}:00:00`
            window.location.href = `/show/program/showview/${idx}`
            let option = {
                data : {show_idx,show_category_idx,show_xrated,show_title,show_place,show_cast1,show_cast2,show_director,show_company,show_content,timestamp}
            }
            const response = await axios.post(`showview/${show_idx}`,option)
            console.log(response)
        }
    }catch(e){
        console.log('/showmodify', e.message)
    }

    function makeOption(){
        const showMonth = document.querySelector('#showMonth')
        const showDate = document.querySelector('#showDate')
        const showHour = document.querySelector('#showHour')
        // const timestamp = `DATE_FORMAT (show_date, %Y-%m-%d %h:%i) AS show_date`

        let monthlist=[] 
        let datelist=[]
        let timelist=[]

        for(let i=1; i<=12; i++){ monthlist.push(`${i}`) ;} //열두달 채워넣기
        for(let i=1; i<=31; i++){ datelist.push(`${i}`) ;} //31일 채워넣기
        timelist = ['10','13','18']
        
        monthlist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`
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
