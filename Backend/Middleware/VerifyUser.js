const customError = require("../utils/customError")
const jwt = require('jsonwebtoken')

const verifyUser = async(req,res,next)=>{
    try {
        const cookie = req.cookies?.access_token
        if(!cookie){
            return next(customError(401,'Session Expired !'))
        }
         jwt.verify(cookie,process.env?.JWT_SECRETS,(err,user)=>{
            if(err){
                return next(customError(401,'Forbidden'))
            }
            req.user = user
            next()
        })
    } catch (error) {
        return next(customError(401,'Something went wrong, Please login again'))
    }
}

module.exports = verifyUser