const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
require('dotenv').config();
const port = process.env.PORT;
const router = require('./routes');

app.set('veiw engine','html');
nunjucks.configure('views',{
    express:app
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);

app.listen(port,_=>{
    `api server running on localhost:${port}`;
})

