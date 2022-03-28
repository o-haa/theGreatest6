exports.main = (req,res, next) =>{
    next()
}

exports.showHome = (req,res)=>{
    res.render('./show/showHome')
}

exports.showList = (req,res)=>{
    res.render('./show/showList')
}

exports.showCard = (req,res)=>{
    res.render('./show/showCard')
}

exports.showCalendar = (req,res)=>{
    res.render('./show/showCalendar')
}

exports.showView = (req,res)=>{
    res.render('./show/showView')
}

exports.showWrite = (req,res)=>{
    res.render('./show/showWrite')
}

exports.showModify = (req,res)=>{
    res.render('./show/showModify')
}

exports.ticketopen = (req,res)=>{

}

exports.test = (req,res)=>{
    res.render('./show/myCalendar')
}

