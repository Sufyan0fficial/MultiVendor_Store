const asyncWrapper = require("../Middleware/asyncWrapper")
const UserModel = require('../Models/user.model')
const customError = require("../utils/customError")

const UpdateUserAddress = asyncWrapper(async(req,res,next)=>{
    const id = req.params?.id
    const UserExist = await UserModel.findById(id)
    if(!UserExist){
        return next(customError(400,'User does not exist'))
    }
    const UserWithUpdatedAddress = await UserModel.findByIdAndUpdate(id,{addresses:[...UserExist?.addresses,req.body]},{
        new:true,
        runValidators:true
    })
    const {password, ...rest} = UserWithUpdatedAddress?._doc
    res.status(200).json({
        success:true,
        message:'Address successfully added',
        data: rest
    })
})

const EditUserAddress = asyncWrapper(async(req,res,next)=>{
     const id = req.params?.id
    const UserExist = await UserModel.findById(id)
    if(!UserExist){
        return next(customError(400,'User does not exist'))
    }
    const addresses = UserExist?.addresses?.map((item,i)=>{
        const targetAddress = item?.address_type  === req.body?.address_type
        console.log('target address',targetAddress)
        return(
            targetAddress ? req.body : item
        )
    })
    console.log('addresses are',addresses)

    const UserWithUpdatedAddress = await UserModel.findByIdAndUpdate(id,{addresses:addresses},{
        new:true,
        runValidators:true
    })
    const {password, ...rest} = UserWithUpdatedAddress?._doc
    res.status(200).json({
        success:true,
        message:'Address updated successfully',
        data: rest
    })
})

const DeleteUserAddress = asyncWrapper(async(req,res,next)=>{
    const id = req.params?.id
    const UserExist = await UserModel.findById(id)
    if(!UserExist){
        return next(customError(400,'User does not exist'))
    }
    const addresses = UserExist?.addresses?.filter((item,i)=>{
        return item?.address_type !== req.body?.address_type
    })
    const UserWithUpdatedAddress = await UserModel.findByIdAndUpdate(id,{addresses:addresses},{
        new:true,
        runValidators:true
    })
    const {password, ...rest} = UserWithUpdatedAddress?._doc
    res.status(200).json({
        success:true,
        message:'Address deleted successfully',
        data: rest
    })
})






module.exports = {
    UpdateUserAddress,
    EditUserAddress,
    DeleteUserAddress
}