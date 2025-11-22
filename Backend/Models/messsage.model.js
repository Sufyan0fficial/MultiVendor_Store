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
        unread:{
            customer:Number,
            vendor:Number
            
        },
        onlineStatus:{
            customer:Boolean,
            vendor:Boolean
        },
        lastMessage:String,
        messages:[
            {
            type:Object
            }
        ],
        profileData:{
            customer:Object,
            vendor:Object
        }
    },{
        timestamps:true
    })


    const MessageModel = new mongoose.model('Message',MessageSchema)

    module.exports = MessageModel