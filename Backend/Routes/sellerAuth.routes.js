const router = require('express').Router()
const {
    Signup,
    ActivateAccount,
    Login,
    Logout,
    FetchShopProfile
} = require('../Controller/sellerauth.controller')
const uploads = require('../utils/multerStorage')

router.route('/signup').post(uploads.single('avatar'),Signup)
router.route('/activation').post(ActivateAccount)
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/shop-profile/:id').get(FetchShopProfile)


module.exports = router