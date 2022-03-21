const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || '4001'
const router = require('./routes')

app.set('view engine', 'html')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)

app.listen(port, _ => {
    console.log(`back server running on localhost:${port}`)
})