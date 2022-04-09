//결제 수단 정보 불ㅓ오기
exports.selectPay = (req,res) => {
    try{

    } catch (e) {
        
    }
}

//결제 수단 정보 입력
exports.insertPay = (req,res) => {

    try{

    } catch (e) {

    }
}

exports.checkPoint = async(req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    const prepare = [ userIdx ]
    try{
        const result = pool.execute(sql.checkPoint,prepare)
        response = {
            result,
            errno: 0
        }
        console.log(result)
    } catch (e) {
        console.log(e.message)
    }
    res.json(response)
}


//포인트 사용하기
exports.usePoint = (req,res) => {

    try{

    } catch (e) {

    }
}