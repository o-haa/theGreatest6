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
//파일 업로드 포함
}

exports.showModify = (req,res)=>{
res.render('./show/program/showModify')
//파일 업로드 포함
}

exports.ticketOpen = (req,res)=>{

}

exports.test = (req,res)=>{
res.render('./show/program/myCalendar')
}

