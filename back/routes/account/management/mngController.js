const { pool } = require('../../../db')

exports.info = (req, res) => {
    res.send('info페이지')
}

exports.myTicket = (req, res) => {
    res.send('내 티켓')

}

exports.myPic = (req, res) => {
    res.send('내 픽')

}

exports.myCalendar = (req, res) => {
    res.send('내 달력')

}

exports.myAct = (req, res) => {
    res.send('내 활동')

}