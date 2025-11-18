const asyncWrapper = require('../Middleware/asyncWrapper')
const MessageModel = require('../Models/messsage.model')

const UserOnline = asyncWrapper(async(data)=>{
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
})


module.exports = {UserOnline}