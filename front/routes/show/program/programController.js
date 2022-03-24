exports.main = (req,res, next) =>{
    // res.send('/쇼/프로그램 메인')
    next()
}

exports.calendar = (req,res)=>{
    res.render('show/showCalendar')
}