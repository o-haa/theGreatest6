const express = require('express')
const app = express()
const nunjucks = require('nunjucks');
require('dotenv').config();
const port = process.env.PORT;
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require('socket.io')
const http = require('http')
const fs = require('fs')
const server = http.createServer(app)
const io = socket(server)

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true
})

app.use(cookieParser());
app.use(cors({
    origin:true,
    credentials:true 
}))
app.use(express.static('public'));
app.use('/img',express.static('uploads'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

app.get('/',(req,res)=>{
    fs.readFile('./views/index.html',(err,data)=>{
        if(err){
            res.send('error')
        } else{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
        }
    })
})

io.sockets.on('connection',(socket)=>{
    // 새로운 유저가 접속했을 경우 다른 소켓에게 알려줌.
    socket.on('newUser',(name)=>{
        console.log(name +'님이 접속하였습니다.')

        // 소켓에 이름 저장
        socket.name = name

        //모든 소켓에게 전송
        io.sockets.emit('update',{type:'connect',name:'SERVER', message: name + '님이 접속하였습니다.'})
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

server.listen(port,_=>{
    console.log(`front server running on localhost:${port}`);
})

