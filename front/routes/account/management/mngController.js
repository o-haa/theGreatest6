const {decodingToken} = require('../../../utils/token')


exports.myInfo = (req, res) => {

    const { AccessToken} = req.cookies
    decodingToken(AccessToken)

    res.render('./account/myInfo');
}

exports.myTicket = (req, res) => {
    res.render('./account/myTicket');

}

exports.myPick = (req, res) => {
    res.render('./account/myPick');

}

exports.myCalendar = (req, res) => {
    res.render('./account/myCalendar');

}

exports.myAct = (req, res) => {
    res.render('./account/myAct');
}