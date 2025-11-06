const mongoose = require('mongoose')


const SellerSchema = new mongoose.Schema(
   {
    shop_name:{
        type:String,
        requried:[true,'Shop name is required']
    },
    phone:{
        type:String,
        requried:[true,'Seller Phone Number is required']
    },
    email:{
        type:String,
        required:[true,'Seller email is required']
    },
    address:{
        type:String,
        required:true
    },
    zip_code:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        reuqired:true
    }

   },{
    timestamps:true
   }
)

const SellerModel = new mongoose.model('Shop',SellerSchema)

module.exports = SellerModel