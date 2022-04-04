//공연 관리하는 페이지
exports.showManagement = (req,res) =>{
    res.send('showManagement')
}

//회원 관리하는 페이지
exports.accountManagement = (req,res) =>{
    res.send('회원관리')

}

//혜택 관리하는 페이지
exports.benefitManagement = (req,res) =>{
    res.send('어드민 혜택 관리')

}

//게시물 관리하는 페이지
exports.boardManagement = (req,res) =>{
    res.send('어드민 게시물 관리')

}

//통계를 보는 페이지
exports.graphicChart = (req,res) =>{
    res.send('통계')

}