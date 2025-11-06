const router = require('express').Router()
const {
    UpdateUserAddress,
    EditUserAddress,
    DeleteUserAddress
} = require('../Controller/user.controller.js')

router.route('/add-address/:id').patch(UpdateUserAddress)
router.route('/edit-address/:id').patch(EditUserAddress)
router.route('/delete-address/:id').patch(DeleteUserAddress)

module.exports = router