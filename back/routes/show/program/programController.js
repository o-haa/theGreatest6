const {pool} = require('../../../db.js')
// const {db} = require('./showTestDB')


exports.main = (req,res, next) =>{
    next()
}

exports.showList = (req,res)=>{
    res.send('연결되냐')
}

exports.showCard = (req,res)=>{
    console.log('showCard call!')
}

exports.showCalendar = (req,res)=>{
    console.log('showCalendark call!')
}

exports.showModify = (req,res)=>{
    console.log('글수정하냐')
}

exports.showWrite = async (req,res)=>{
    const {idx, userid, subject, title, content} = req.body
    console.log(req.body)
    const data = {
        idx:idx.value,
        userid:userid.value,
        subject:subject.value,
        title:title.value,
        content:content.value
    };
    db.push(data)
    console.log(res.json(data))
}

exports.showCalendar = (req,res)=>{
    console.log('showCalendark call!')
}