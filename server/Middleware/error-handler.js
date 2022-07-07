const HttpError = require('../Exceptions/http-error');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof HttpError) {
        res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({ message: 'Internal server error' });
}