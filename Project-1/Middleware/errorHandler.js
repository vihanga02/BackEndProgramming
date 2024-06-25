const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                messege: err.messege,
                stackTrace: err.stack
            })
        case constants.UNAUTHORIZED:
            res.json({
                title: "Not Found",
                messege: err.messege,
                stackTrace: err.stack
            });
            break;
        case constants.FOBBIEDEN:
            res.json({
                title: "Forbidden",
                messege: err.messege,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                messege: err.messege,
                stackTrace: err.stack
            });
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                messege: err.messege,
                stackTrace: err.stack
            });
        default:
            break;
    }
};

module.exports = errorHandler;