
exports.signUp = (req,res)=>{
    res.render('./account/signup');
}

exports.signIn = (req,res)=>{
    res.render('./account/signin');
}

exports.privacyPolicy = (req,res)=>{
    res.render('./account/privacyPolicy')
}

exports.destroyCookie = (req,res)=>{
    res.clearCookie('AccessToken')
    res.end()
    location.href='/'
}