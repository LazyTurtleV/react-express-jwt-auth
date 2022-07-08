const HttpError = require('../Exceptions/http-error');

module.exports = function (err, req, res, next) {
    console.log(err);
    //temprorary solution until I get with a insteadof bug
    //if (err instanceof HttpError) {
    if (err.type === 'httpError') {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({ message: 'Internal server error' });
}