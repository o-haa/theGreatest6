
let socket
socket = io.connect(`http://localhost:4001/chat`,{
    transports: ['websocket']
})

// //접속 되었을 때 실행
socket.on('connect',()=>{
    socket.emit('newUser',name)
})
    

//서버로부터 데이터 받은 경우
socket.on('update',(data)=>{

    const chat =document.querySelector('#chat')
    const message = document.createElement('div')
    const node = document.createTextNode(`${data.name}: ${data.message}`)
    let className = ''

    //타입에 따라 적용할 클래스를 다르게 지정
    switch(data.type){
        case 'message':
            className = 'other'
        break
        case 'connect':
            className = 'connect'
        break
        case 'disconnect':
            className = 'disconnect'
        break
    }

    message.classList.add(className)
    message.appendChild(node)
    chat.appendChild(message)
})


//메시지 전송 함수
function send(data){
    console.log(socket)
    const message = document.querySelector('#chatV').value 

    //메세지 보내면 빈칸으로 변경
    document.querySelector('#chatV').value  = ''
    //내가 전송한 메시지 창에 표시
    var chat = document.querySelector('#chat')
    var msg = document.createElement('div')
    var node = document.createTextNode(` ${message}`)
    msg.classList.add('me')
    msg.appendChild(node)
    chat.appendChild(msg)

    //서버로 message 이벤트 전달 + 데이터와 함께
    socket.on('message',(data)=>{
        data.name = socket.name
        socket.emit('message',{type:'message', name: data.name, message:message})
        console.log('내가보냄',socket.emit('message',{type:'message', name: data.name, message:message}).subs)
    })
    
}




