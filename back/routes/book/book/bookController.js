exports.selectBookInfo = async (req,res) => {
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

exports.InsertBookInfo = async (req,res) => {
    const prepare = [ ]

    try{
        const [ result ] = await axios.post( '/InsertBookInfo', prepare)

    } catch (e) {

    }
}

exports.selectSeatInfo = (req,res) => {
    try{

    } catch (e) {
        
    }
}