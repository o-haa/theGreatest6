document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const img = document.querySelector('.img')
    const summaryTextBox = document.querySelector('.summaryTextBox')
    const summaryTextList = document.querySelectorAll('.summaryText')
    const goViewLink = document.querySelectorAll('.goViewLink')

    console.log(summaryTextList)
    
    for(let i=0; i<summaryTextList.length; i++){
        goViewLink[i].addEventListener('click',()=>{
            console.log(summaryTextList[i].className)
            if(summaryTextList[i].className.search('front')!==-1){
                summaryTextList[i].className = summaryTextList[i].className.replace('back',"front")
                summaryTextList[i].className = summaryTextList[i].className.replace('VIEW',"HIDDEN")
                summaryTextList[i+1].className = summaryTextList[i+1].className.replace('HIDDEN',"VIEW")
            }else{
                summaryTextList[i].className = summaryTextList[i].className.replace('front',"back")
                summaryTextList[i].className = summaryTextList[i].className.replace('VIEW',"HIDDEN")
                summaryTextList[i+1].className = summaryTextList[i+1].className.replace('HIDDEN',"VIEW")
            }
        })
    }
}