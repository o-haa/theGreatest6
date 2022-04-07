//회원 관리하는 페이지
exports.accountMgt = (req,res) =>{
    res.render('./admin/accountMgt')
}

//혜택 관리하는 페이지
exports.benefitMgt = (req,res) =>{
    res.send('어드민 혜택 관리')

}