exports.main = (req,res, next) =>{
    next()
}

//달력 기능
exports.calendar = (req,res)=>{
    res.render('./show/showCalendar')
}
//상세피이지 보여주는 기능
exports.showView = (req,res)=>{
    res.render('./show/showView')
}

//리스트 메뉴
exports.showList = (req,res)=>{
    res.render('./show/showList')
}

//그리드 메뉴
exports.showGrid = (req,res)=>{
    res.render('./show/showGrid')
}

//티켓 예매까지만! 결제기능은 payment로 빠짐   
exports.ticketopen = (req,res)=>{

}

exports.test = (req,res)=>{
    res.render('./show/myCalendar')
}

