const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
require('dotenv').config();
const port = process.env.PORT;


app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true
})

app.get('/',(req,res)=>{
    res.render('./chat.html')
})

const server = app.listen(port,_=>{
    console.log(`front server running on localhost:${port}`);
})

const io = require('socket.io')(server,{
    cors: { origin: '*' },
})

const chat = io.of('/')

console.log(chat)
chat.on('connection',(socket)=>{
    // 새로운 유저가 접속했을 경우 다른 소켓에게 알려줌.
    socket.on('newUser',(name)=>{
        console.log(name +'님이 접속하였습니다.')

        // 소켓에 이름 저장
        socket.name = name

        //모든 소켓에게 전송
        chat.sockets.emit('update',{type:'connect',name:'SERVER', message: name + '님이 접속하였습니다.'})
    })

    // 전송한 메세지 받기
    socket.on('message',(data)=>{
        //받은 데이터에 누가 보냈는지 이름 추가
        data.name = socket.name
        console.log(data)

        //보낸 사람을 제외한 나머지 유저에게 메시지 전송
        socket.broadcast.emit('update',data);
    })

    socket.on('disconnect',()=>{
        console.log(socket.name + '님이 나가셨습니다.')
        //나가는 사람을 제외한 나머지 유저에게 메시지 전송
        socket.broadcast.emit('update',{type:'disconnect', name:'SERVER', message: socket.name + '님이 나가셨습니다.'})
    })
})
