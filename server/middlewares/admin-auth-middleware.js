const ApiError = require('../exceptions/api-error');

module.exports = function (req, res, next) {
    if (req.user.role !== 'ADMIN') {
        throw ApiError.ForbiddenError();
    }
    next();
}
