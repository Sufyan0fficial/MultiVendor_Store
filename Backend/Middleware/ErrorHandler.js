const ErrorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    const message = `Resource not found against ID: ${req.params.id}`;
    err.message = message
    err.statusCode = 400
  }

  if(err.code === 11000){
    const message = 'Duplicate Key Error'
    err.message = message
    err.statusCode = 400
  }

  if(err.name === 'JsonWebTokenError'){
    const message = 'Your URL is invalid, Please try again later'
    err.message = message
    err.statusCode = 400
  }

  if(err.name === 'TokenExpiredError'){
    const message = 'Your token is expired , Please try again later'
    err.message = message
    err.statusCode = 400
  }

  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};

module.exports = ErrorHandler;
