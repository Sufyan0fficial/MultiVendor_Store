const router = require('express').Router()
const {
    CreateOrders,
    GetVendorOrders,
    GetCustomerOrders,
    GetOrderDetails,
    updateOrderStatus
} = require('../Controller/order.controller.js')


router.route('/create-orders').post(CreateOrders)
router.route('/get-vendor-orders/:id').post(GetVendorOrders)
router.route('/get-customer-orders/:id').post(GetCustomerOrders)
router.route('/get-order-details/:id').post(GetOrderDetails)
router.route('/update-order-status/:id').patch(updateOrderStatus)


module.exports = router