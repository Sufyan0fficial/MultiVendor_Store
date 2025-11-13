const asyncWrapper = require("../Middleware/asyncWrapper");
const SellerModel = require('../Models/seller.model')
const sendMail = require('../utils/SendMail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const customError = require("../utils/customError");
const ProductModel = require('../Models/Product.model');
const EventModel = require("../Models/event.model");


const Signup = asyncWrapper(async(req,res,next)=>{
    const {email} = req.body
    const isRegistered = await SellerModel.findOne({email})
    if(isRegistered){
        return next(customError(400,'Seller already registered'))
    }
    const seller = {
        ...req.body,avatar:req.file?.filename
    }
    const token = jwt.sign(seller,process.env.JWT_SECRETS,{expiresIn:'5m'})
    const activationLink = `${process.env.FE_URL}/seller-activation/${token}`
    res.status(200).json({success:true, message:'Please check your email to activate your account'})

    await sendMail({
        to:email,
        subject:'Activate your seller Account',
        text:`Please click on the link to activate your Seller Account ${activationLink}`
    })
    
})

const ActivateAccount = asyncWrapper(async(req,res,next)=>{
    const {activationString} = req.body
    const seller = jwt.verify(activationString?.id,process.env.JWT_SECRETS)
    console.log('seller data is',seller)
    const {iat,exp,password,...rest} = seller
    const hashedPassword = bcrypt.hashSync(password,10)
    await SellerModel.create({...rest,password:hashedPassword})
    return res.status(201).json({success:true, message:'Account activated successfully,Please login to proceed'})
})


const Login = asyncWrapper(async(req,res,next)=>{
    const {email, password} = req.body
    const isSellerRegistered = await SellerModel.findOne({email})
    if(!isSellerRegistered){
        return next(customError(404,'Invalid Credentials,Please check your email address'))
    }
    const {password:pass,...rest} = isSellerRegistered?._doc
    const checkPassword = bcrypt.compareSync(password,pass)
    if(!checkPassword){
        return next(customError(404,'Invalid Credentials, Please check your Password'))
    }
    const token = jwt.sign({id:isSellerRegistered?._id},process.env.JWT_SECRETS,{expiresIn:'7d'})
    return res.cookie('seller_token',token,{httpOnly:true,maxAge:7*24*60*60*1000}).status(200).json({success:true,message:'Seller logged in successfully',data:rest})
    
})


const Logout = asyncWrapper(async(req,res,next)=>{
    return res.clearCookie('seller_token').status(200).json({success:true,message:'Seller Logged out successfully'})
})

const FetchShopProfile = asyncWrapper(async(req,res,next)=>{
    console.log('fetchign shop proifle data')
    const id = req.params?.id
    const shop = await SellerModel.findOne({_id:id})
    const {password, ...rest} =  shop?._doc
    if(!shop){
        return(next(customError(400,'Requested Shop Does not exist')))
    }
    const shopProducts = await ProductModel.find({shop_id:id})
    const activeEvents = await EventModel.find({shop_id:id})
    const data = {
        ...rest,
        products:shopProducts,
        events:activeEvents
    }
    return res.status(200).json({
        success:true,
        data:data
    })

})

const UpdateShopProfile = asyncWrapper(async(req,res,next)=>{
    const id = req.params?.id
    const updateData = {...req.body}
    
    if(req.file?.filename){
        updateData.avatar = req.file.filename
    }
    
    if(updateData.password){
        updateData.password = bcrypt.hashSync(updateData.password, 10)
    }
    
    const updatedShop = await SellerModel.findByIdAndUpdate(id, updateData, {new: true})
    if(!updatedShop){
        return next(customError(404,'Shop not found'))
    }
    
    const {password, ...rest} = updatedShop._doc
    return res.status(200).json({
        success: true,
        message: 'Shop profile updated successfully',
        data: rest
    })
})

module.exports = {
    Signup,
    ActivateAccount,
    Login,
    Logout,
    FetchShopProfile,
    UpdateShopProfile

}


