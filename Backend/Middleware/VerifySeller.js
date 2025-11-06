const customError = require("../utils/customError")
const asyncWrapper = require("./asyncWrapper")
const jwt = require('jsonwebtoken')

const VerifySeller = asyncWrapper(async(req,res,next)=>{
     const token = req.cookies?.seller_token
    if(!token){
        return next(customError(401,'Unauthorized Identity !'))
    }
    jwt.verify({id:token},process.env.JWT_SECRETS,(err, seller)=>{
        if(err){
            return next(customError(401,'Forbidden ! Something went wrong'))
        }
        req.seller = seller
        next()
    })
})
   

module.exports = VerifySeller
