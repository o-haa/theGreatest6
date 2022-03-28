exports.main = (req,res, next) =>{
    next()
}

exports.showHome = (req,res)=>{
    res.render('./show/home/showHome')
}

exports.showList = (req,res)=>{
    res.render('./show/list/showList')
}

exports.showCard = (req,res)=>{
    res.render('./show/list/showCard')
}

exports.showCalendar = (req,res)=>{
    res.render('./show/list/showCalendar')
}

exports.showView = (req,res)=>{
    res.render('./show/crud/showView')
}

exports.showWrite = (req,res)=>{
    res.render('./show/crud/showWrite')
}

exports.showModify = (req,res)=>{
    res.render('./show/crud/showModify')
}

exports.ticketopen = (req,res)=>{

}

exports.test = (req,res)=>{
    res.render('./show/myCalendar')
}

