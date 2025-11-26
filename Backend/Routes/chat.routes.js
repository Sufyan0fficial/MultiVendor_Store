const router = require('express').Router()
const {
    CustomerChatData,
    VendorChatData,
    fetchUserChats
} = require('../Controller/message.controller')

router.route('/get-customer-chat/:customerid').get(CustomerChatData)
router.route('/get-vendor-chat/:vendorid').get(VendorChatData)
router.route('/get-user-chat/:id').get(fetchUserChats)


module.exports = router 