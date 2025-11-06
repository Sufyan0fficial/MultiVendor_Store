const router = require("express").Router();
const uploads = require("../utils/multerStorage");
const { UserRegistration, ActivateUser, UserLogin, Logout, UpdateProfile } = require("../Controller/auth.controller");

router.route("/signup").post(uploads.single("avatar"), UserRegistration);
router.route('/activation').post(ActivateUser)
router.route('/signin').post(UserLogin)
router.route('/logout').get(Logout)
router.route('/update/:id').patch(uploads.single('avatar'), UpdateProfile)

module.exports = router;
