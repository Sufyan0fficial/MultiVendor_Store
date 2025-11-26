const asyncWrapper = require('../Middleware/asyncWrapper')
const MessageModel = require('../Models/messsage.model')
const VendorModel= require('../Models/seller.model')
const UserModel = require('../Models/user.model')

const UserOnline = async(data)=>{
    const userType = data?.user_type
    const id = data?.id
    const isCustomer = userType === 'customer_id' ? true : false
    const isVendor = userType === 'vendor_id' ? true : false

    const UserDocumentExist = await MessageModel.findOne({[userType]:id})
    if(!UserDocumentExist){
        return
    }
    const updatedData = await MessageModel.findOneAndUpdate({[userType]:id},{onlineStatus:{customer:isCustomer,vendor:isVendor}},{new:true})
    return updatedData
}

const customerMessage = async(data)=>{
    try {
            const newMessage = data?.message
    const chatExist = await MessageModel.findOne({customer_id:data?.customer_id, vendor_id:data?.vendor_id})
    if(chatExist){
        await MessageModel.findOneAndUpdate({customer_id:data?.customer_id, vendor_id:data?.vendor_id},{$push : {messages: newMessage}, lastMessage:data?.lastMessage}, {new:true})
        return
    }
    
    const VendorProfile = await VendorModel.findOne({_id:data?.vendor_id})
    const userProfile = await UserModel.findOne({_id:data?.customer_id})
    const formattedData = {
        customer_id: data?.customer_id,
        vendor_id : data?.vendor_id,
        // unread:{
        //     customer:0,
        //     vendor:0
        // },
        // onlineStatus:{
        //     customer:true,
        //     vendor:false
        // },
        lastMessage:data?.lastMessage,
        messages:[
            data?.message
        ],
        profileData:{
            customer:userProfile,
            vendor:VendorProfile
        }

    }
    console.log('data is',formattedData)
   await MessageModel.create(formattedData)
    } catch (error) {  
        console.log('there is an error',error)
    }

}

const fetchUserChats = asyncWrapper(async(req,res,next)=>{
    const id = req.params?.id
    const chats = await MessageModel.findOne({_id:id})
    return res.status(200).json({success:true,data:chats?.messages})

})


const CustomerChatData = asyncWrapper(async(req,res,next)=>{
    const id =  req.params?.customerid
    const ChatData = await MessageModel.find({customer_id:id})
    return res.status(200).json({
        success:true,
        data:ChatData
    })
})
const VendorChatData = asyncWrapper(async(req,res,next)=>{
    const id =  req.params?.vendorid
    const ChatData = await MessageModel.find({vendor_id:id})
    return res.status(200).json({
        success:true,
        data:ChatData
    })
})


module.exports = {UserOnline, customerMessage, CustomerChatData, VendorChatData, fetchUserChats}