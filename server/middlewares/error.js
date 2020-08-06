function errorHandler(err, req, res, next){
    let statusCode = 500
    let message = 'INTERNAL SERVER ERROR'

    if (err.name == 'SequelizeValidationError'){
        statusCode = 400
        const arrError = []
        const errors = err.errors
        errors.forEach(el => {
            arrError.push(el.message)
        });
        message = arrError
    } else if (err.errorCode == 'NOT_FOUND'){
        statusCode = 404
        message = 'Data not Found'
    } else if (err.errorCode == 'INCORRECT_USER' || err.name == 'JsonWebTokenError'){
        statusCode = 401
        message = 'Username or Password incorrect'
    } else if (err.errorCode == 'NOT_AUTHENTICATED'){
        statusCode = 401
        message = 'Not authenticated'
    } else if (err.errorCode == 'FORBIDDEN_REQUEST'){
        statusCode = 403
        message = 'Not authorize'
    }
    return res.status(statusCode).json({message})
}

module.exports = errorHandler

