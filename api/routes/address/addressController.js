const axios = require('axios');
const kakao_id = process.env.client_id_kakao;
const kakao_secret = process.env.client_secret;
const kakao_uri = process.env.redirect_uri;

exports.kakao = async (req,res) => {
    let { keyAddress } = req.body
    keyAddress = encodeURI(keyAddress)
    let response = {
        result : [],
        errno: 1
    };
    try{
        const result = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${keyAddress}`,{
            headers:{
                'Authorization': `KakaoAK ${kakao_id}`
            }})
            response = {
                result:result.data.documents,
                errno: 0
            };
    } catch (e){
        console.log(e)
    }
    res.json(response)
}