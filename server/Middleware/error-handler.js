const { handler: httpErrorHandler, error: HttpError } = require('../Exceptions/http-error');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof HttpError) {
        return httpErrorHandler(req, res, err);
    }

    return res.status(500).json({ message: 'Internal server error' });
}