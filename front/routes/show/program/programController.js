exports.main = (req,res, next) =>{
    next()
}

//달력 기능
exports.calendar = (req,res)=>{
    res.render('./show/showCalendar')
}

//티켓 예매까지만! 결제기능은 payment로 빠짐   
exports.ticketopen = (req,res)=>{

}

exports.test = (req,res)=>{
    res.render('./show/myCalendar')
}

