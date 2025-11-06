const router = require('express').Router()
const {
    CreateOrders,
    GetVendorOrders,
    GetCustomerOrders
} = require('../Controller/order.controller.js')


router.route('/create-orders').post(CreateOrders)
router.route('/get-vendor-orders/:id').post(GetVendorOrders)
router.route('/get-customer-orders/:id').post(GetCustomerOrders)


module.exports = router