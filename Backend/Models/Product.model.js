const { model } = require('mongoose')
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:[true,'Product name is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    category:{
        type:String,
        required:[true,'Category is required']
    },
    tags:{
        type:String,
    },
    original_price:{
        type:Number,
        required:[true,'Original Price is required']
    },
    discounted_price:{
        type:Number,
    },
    images:[
        {
            type:String,
            required:[true, 'image is required']
        }
    ],
    shop_id:{
        type:String,
        required:[true,'Shop ID is requird']
    },
    sold_out:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        required:[true, 'Product Stock is required']
    },
    shop:{
        type:Object,
        required:[true,'Shop Data is required']
    },
    discount:{
        type:Boolean,
        required:true
    },
    rating: {
        type:Number
    }

},{
    timestamps:true
})


const ProductModel = new model('Product',ProductSchema)

module.exports = ProductModel