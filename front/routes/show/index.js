const express = require('express')
const router = express.Router()
const programRouter = require('./program')
// const boardRouter = require('./board')

router.use('/program', programRouter)



module.exports = router