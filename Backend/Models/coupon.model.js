const { model } = require('mongoose')
const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
    coupon_name:{
        type:String,
        required:[true,'Coupon name is required'],
        unique:[true,'Coupon name must be unique']

    },
    discount:{
        type:Number,
        required:[true,'Discount required']
    },
    min_amount:{
        type:Number,
    },
    max_amount:{
        type:Number,
    },
    shop_id:{
        type:String,
        required:[true,'Shop ID is required']
    },
    selected_product:{
        type:String,
        required:[true, 'Product is required to apply coupon code']
    }

},{
    timestamps:true
})


const CouponModel = new model('Coupon',CouponSchema)

module.exports = CouponModel