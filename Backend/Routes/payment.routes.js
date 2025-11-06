const router = require('express').Router()
const {
    StripeCheckoutSession,
    SessionVerification

} = require('../Controller/payment.controller.js')

router.route('/stripe-checkout-session').post(StripeCheckoutSession)
router.route('/stripe-checkout-session-verification').post(SessionVerification)


module.exports = router