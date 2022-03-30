exports.decodingToken = function(cookie){
    [header,payload,signature] = cookie.split('.')
    const user = JSON.parse( Buffer.from(payload,'base64').toString('utf-8') )
    console.log(user)
}