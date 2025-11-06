const router = require('express').Router()
const { DeleteCoupon } = require('../Controller/coupon.controller.js')
const {
    CreateCoupon,
    GetAllCoupons,
    ApplyCouponCode
} = require('../Controller/coupon.controller.js')

router.route('/create-coupon').post(CreateCoupon)
router.route('/apply-coupon-code').post(ApplyCouponCode)
router.route('/get-all-coupons/:id').get(GetAllCoupons)
router.route('/delete/:id').delete(DeleteCoupon)



module.exports = router