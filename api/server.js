const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
require('dotenv').config();
const port = process.env.PORT;
const router = require('./routes');
const cors = require('cors');

app.set('veiw engine','html');
nunjucks.configure('views',{
    express:app
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin:true,
    credentials:true ,
    allowedHeaders:['Content-type','Authorization'],
}));
app.use(router);

app.listen(5001,_=>{
    `api server running on localhost:5001`;
})

