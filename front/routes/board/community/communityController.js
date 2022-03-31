exports.communityList = (req,res) =>{
    res.render('./board/community/communityList')
}

exports.communityWrite = (req,res) =>{
    res.render('./board/community/communityWrite')
}

exports.communityView = async (req,res) =>{
    const { AccessToken } = req.cookies;
    const data = {
        AccessToken
    };
    try {
        const response = await axios.post('/auth', data);
        const { user } = response.data;
        console.log(user.user_nickname)
    } catch (e) {
        console.log(e.message);
    }


    res.render('./board/community/communityView')
}

exports.communityUpdate = (req,res)=>{
    res.render('./board/community/communityUpdate')
}

