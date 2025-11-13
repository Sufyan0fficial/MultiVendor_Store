const router = require('express').Router()
const {
    Signup,
    ActivateAccount,
    Login,
    Logout,
    FetchShopProfile,
    UpdateShopProfile
} = require('../Controller/sellerauth.controller')
const uploads = require('../utils/multerStorage')
const VerifySeller = require('../Middleware/VerifySeller')

router.route('/signup').post(uploads.single('avatar'),Signup)
router.route('/activation').post(ActivateAccount)
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/updateProfile/:id').patch(uploads.single('avatar'),UpdateShopProfile)
router.route('/shop-profile/:id').get(FetchShopProfile)


module.exports = router
// Import withdrawal functions
const { RequestWithdrawal, GetWithdrawalHistory, GetFinancialStats } = require('../Controller/sellerauth.controller')

// Withdrawal routes
router.route('/withdrawal/request').post(VerifySeller, RequestWithdrawal)
router.route('/withdrawal/history').get(VerifySeller, GetWithdrawalHistory)
router.route('/financial-stats').get(VerifySeller, GetFinancialStats)
