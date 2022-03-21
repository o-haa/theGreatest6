const {pool} = require('../../../db')

exports.main = (req,res, next) =>{
    res.send('일정 리스트 형태로 보여줄거임')
    next()
}

exports.calendar = (req,res)=>{
    res.send('달력 형태로 보여줄거임')
}