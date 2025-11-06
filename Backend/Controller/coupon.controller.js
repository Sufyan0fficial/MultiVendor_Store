const { Cursor } = require('mongoose')
const asyncWrapper = require('../Middleware/asyncWrapper')
const CouponModel = require('../Models/coupon.model')
const customError = require('../utils/customError')


const CreateCoupon = asyncWrapper(async(req,res,next)=>{
    const coupon = req.body?.coupon_name
    const existedCoupon = await CouponModel.findOne({coupon_name:coupon})
    if(existedCoupon){
        return next(customError(400,'Coupon with same name already existed, please choose else name'))
    }
    const createdCoupon = await CouponModel.create(req.body)
    const shopid = createdCoupon?.shop_id
    const allCoupons = await CouponModel.find({shop_id:shopid})
    return res.status(200).json({success:true, message:'Coupon created successfully',data:allCoupons})
})

const GetAllCoupons = asyncWrapper(async(req,res,next)=>{
    const id = req.params?.id
    if(!id){
        return next(customError(400,'Failed to get coupons'))
    }
    const allCoupons = await CouponModel.find({shop_id:id})
    return res.status(200).json({success:true,data:allCoupons})
})

const DeleteCoupon = asyncWrapper(async(req,res,next)=>{
    const id = req.params?.id
    if(!id){
        return next(customError(400,'Failed to delete requested Coupon'))
    }
    const deletedCoupon = await CouponModel.findOneAndDelete({_id:id})
    const remainingCoupons = await CouponModel.find({shop_id:deletedCoupon?.shop_id})
    return res.status(200).json({success:true, message:'Coupon Deleted successfully',data:remainingCoupons})
})

const ApplyCouponCode = asyncWrapper(async(req,res,next)=>{
    const coupon = req.body.coupon
    const products = req.body.products

    const CouponExist = await CouponModel.findOne({coupon_name:coupon})
    if(!CouponExist){
        return next(customError(400,'Coupon code does not exist'))
    }
    const filteredProducts = products && products?.filter((item,i)=>{
        return item?.shop_id === CouponExist?.shop_id
    })
    if(filteredProducts?.length === 0){
        return next(customError(400,'Selected products are not eligible for this coupon code'))
    }
    const couponAppliedData = filteredProducts?.length > 0 && filteredProducts?.map((item,i)=>{
        const price = item?.discounted_price ? item?.discounted_price : item?.original_price
        const couponedPrice = price - ((price * CouponExist?.discount)/100)
        return ({...item,couponedPrice:couponedPrice})
    })
    return res.status(200).json({
        success:true,
        message:'Coupon applied successfuly',
        data:couponAppliedData
    })
})

module.exports = {
    CreateCoupon,
    GetAllCoupons,
    DeleteCoupon,
    ApplyCouponCode
}