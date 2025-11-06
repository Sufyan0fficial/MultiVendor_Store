const { model } = require('mongoose')
const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
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
        required:false
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
        required:[true,'Shop Data is required for event']
    },
    status:{
        type:String,
        default:'running'
    },
    start_date:{
        type:String,
        required:[true,'Event start date is required']
    },
    finish_date:{
        type:String,
        required:[true,'Event finish date is required']
    },

},{
    timestamps:true
})


const EventModel = new model('Event',EventSchema)

module.exports = EventModel