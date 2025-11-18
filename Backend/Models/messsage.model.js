const mongoose = require('mongoose')
const { Message } = require('../../Frontend/src/utils/notifymessage')

const MessageSchema = new mongoose.Schema({
    customer_id:{
        type:String,
        required:true
    },
    vendor_id:{
        type:String,
        required:true
    },
    timeStamp:{
        customer:String,
        vendor:String
    },
    unread:{
        customer:Number,
        vendor:Number
        
    },
    onlineStatus:{
        customer:Boolean,
        vendor:Boolean
    },
    lastMessage:{
        customer:String,
        vendor:String
    },
    messages:[
        {
          customer:Object,
          vendor:Object
        }
    ]
},{
    timestamps:true
})


const MessageModel = new mongoose.model('Message',MessageSchema)

module.exports = MessageModel