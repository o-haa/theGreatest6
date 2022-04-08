exports.selectBookInfo = async(req,res) => {
    let response = {
        result: {},
        errno: 1
    };
    try{
        const [ result ] = await axios.post( '/selectBookInfo', prepare );
        response = {
            result: {},
            errno: 1
        };
    } catch (e) {
        console.log(e.message);
    }
}

exports.InsertBookInfo = (req,res) => {
    prepare
    const [ result ] = await axios.post( '/InsertBookInfo', prepare)

    try{

    } catch (e) {

    }
}

exports.selectSeatInfo = (req,res) => {
    try{

    } catch (e) {
        
    }
}

exports.InsertSeatInfo = (req,res) => {

    try{

    } catch (e) {

    }
}