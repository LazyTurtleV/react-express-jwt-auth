const { error: HttpError } = require("../Exceptions/http-error");
const TockenService = require("../Services/TockenService");

module.exports = function (req, res, next) {
    try {
        //console.log('REQ', req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const userData = TockenService.validateToken(token);

        if (!userData) {
            throw HttpError.unauthorized();
        }

        res.user = userData;
        next();
    } catch(e) {
        return next(e);
    }
}