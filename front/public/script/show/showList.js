document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const listBtn = document.querySelector('#List');
    const gridBtn = document.querySelector('#grid');
    const calBtn = document.querySelector('#claBtn');
    const homeBtn = document.querySelector('#home');
    const aboutBtn = document.querySelector('#about');
    const mainContent = document.querySelector('#mainContent')

    //mainContent 내용을 담은 option
    const htmlData = mainContent.innerHTML
    let option = {
        data : htmlData
    }
    
    const response = await axios.post('showlist',option)
    console.log('도착')
    
    const Nodes = response.data.result
    let trElement = document.querySelector('#showList_row');
    let trInner = document.querySelector('#showList_row').innerHTML;
    const tbody = document.querySelector("table > tbody")

    let template=''
    Nodes.forEach(v=>{
        const clone = document.importNode(trElement.content,true)
        let tdElement = clone.querySelectorAll('td')
        const aElement = document.createElement('a')
        aElement.setAttribute(`href`,`showview/${v.show_idx}`)
        aElement.innerHTML = v.show_title

        tdElement[0].innerHTML = v.show_idx
        tdElement[1].innerHTML = v.show_category_idx
        tdElement[2].innerHTML = v.show_xrated
        tdElement[3].innerHTML = ''
        tdElement[3].append(aElement)
        tdElement[4].innerHTML = "관리자"
        
        tbody.append(clone)
        
        template += trInner.replace('{show_idx}',v.show_idx)
                            .replace('{show_title}',v.show_title)
                            .replace('{show_category_idx}',v.show_category_idx)
                            .replace('{show_xrated}',v.show_xrated)
    })

    function moveHome(){ 
        window.location.href = 'http://localhost:3001/'; 
    }
    function moveAbout(){
        window.location.href = 'http://localhost:3001/about';
    }
    homeBtn.addEventListener('click', moveHome)
    aboutBtn.addEventListener('click', moveAbout)
}