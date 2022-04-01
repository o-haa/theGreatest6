const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const port = process.env.PORT || '4001';
const router = require('./routes');

app.set('view engine', 'html');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
    origin: true,
    // methods:"GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders:['Content-type','Authorization'],
    credentials: true
};

app.use(cors(options));
app.use(router);

app.listen(port, _ => {
    console.log(`back server running on localhost:${port}`);
})