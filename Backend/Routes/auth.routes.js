const router = require("express").Router();
const uploads = require("../utils/multerStorage");
const { UserRegistration, ActivateUser, UserLogin } = require("../Controller/auth.controller");

router.route("/signup").post(uploads.single("avatar"), UserRegistration);
router.route('/activation').post(ActivateUser)
router.route('/signin').post(UserLogin)

module.exports = router;
