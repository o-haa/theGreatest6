exports.main = (req,res, next) =>{
    next()
}

exports.showHome = (req,res)=>{
    res.render('./show/program/showHome')
}

exports.showList = (req,res)=>{
    res.render('./show/program/showList')
}

exports.showCard = (req,res)=>{
    res.render('./show/program/showCard')
}

exports.showCalendar = (req,res)=>{
    res.render('./show/program/showCalendar')
}

exports.showView = (req,res)=>{
    res.render('./show/program/showView')
}

exports.showWrite = (req,res)=>{
    res.render('./show/program/showWrite')
}

exports.showModify = (req,res)=>{
    res.render('./show/program/showModify')
}

exports.ticketopen = (req,res)=>{

}

exports.test = (req,res)=>{
    res.render('./show/program/myCalendar')
}

