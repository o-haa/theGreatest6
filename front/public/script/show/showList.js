document.addEventListener('DOMContentLoaded', init)

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const response = await axios.post('showlist')
    console.log('도착')
    
    const Nodes = response.data.result //배열
    let trElement = document.querySelector('#showList_row');// 반복할 템플릿
    let trInner = document.querySelector('#showList_row').innerHTML; //템플릿 string
    const tbody = document.querySelector("table > tbody") // 템플릿 tr html

    //목록을 그려내는 함수
    let template=''
    Nodes.forEach(v=>{
        //템플릿 내부 복사  tr부분
        const clone = document.importNode(trElement.content,true)
        console.log(clone)
        //템플릿 안 td
        let tdElement = clone.querySelectorAll('td')
        //링크 걸 a 생성
        const aElement = document.createElement('a')
        aElement.setAttribute(`href`,`showview/${v.show_idx}`)
        aElement.innerHTML = v.show_title

        tdElement[0].innerHTML = v.show_idx //<td>v.show_idx</td>
        tdElement[1].innerHTML = v.show_category_idx
        tdElement[2].innerHTML = v.show_xrated
        tdElement[3].innerHTML = '' //appendChild()가 안되서 초기화 시킴
        tdElement[3].append(aElement)
        tdElement[4].innerHTML = "관리자"
        
        tbody.append(clone)
        
        template += trInner.replace('{show_idx}',v.show_idx)
                            .replace('{show_title}',v.show_title)
                            .replace('{show_category_idx}',v.show_category_idx)
                            .replace('{show_xrated}',v.show_xrated)
    })

    // 헤더 nav home, admin 이동
    // const homeBtn = document.querySelector('#home');
    // const aboutBtn = document.querySelector('#about');

    // function moveHome(){ 
    //     window.location.href = 'http://localhost:3001/'; 
    // }
    // function moveAbout(){
    //     window.location.href = 'http://localhost:3001/about';
    // }
    // homeBtn.addEventListener('click', moveHome)
    // aboutBtn.addEventListener('click', moveAbout)
}
