const router = require('express').Router()
const {
    CustomerChatData,
    VendorChatData
} = require('../Controller/message.controller')

router.route('/get-customer-chat/:customerid').get(CustomerChatData)
router.route('/get-vendor-chat/:vendorid').get(VendorChatData)


module.exports = router