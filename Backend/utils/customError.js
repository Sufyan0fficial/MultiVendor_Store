const customError = (statusCode, message)=>{
    const error = new Error()
    error.statusCode = statusCode || 500
    error.message = message || 'Internal Server Error'
    throw  error
}

module.exports = customError