const express = require('express')
const router = express.Router()
const programRouter = require('./program')

router.use('/program', programRouter)

module.exports = router