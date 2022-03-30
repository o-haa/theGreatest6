exports.communityList = (req,res) =>{
    res.render('./board/community/communityList')
}

exports.communityWrite = (req,res) =>{
    res.render('./board/community/communityWrite')
}

exports.communityView = (req,res) =>{
    console.log(req.cookies)
    res.render('./board/community/communityView')
}

exports.communityUpdate = (req,res)=>{
    res.render('./board/community/communityUpdate')
}

