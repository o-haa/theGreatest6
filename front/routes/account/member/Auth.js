exports.Auth = async (req, res, next) => {
    const { AccessToken } = req.cookies;
    try {
        if ( AccessToken === undefined ) throw new Error ('토큰 없음');
        next();
    } catch (e) {
        console.log(e.message);
        res.render('account/signIn');
    }
}