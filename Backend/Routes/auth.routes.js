const router = require("express").Router();
const uploads = require("../utils/multerStorage");
const { UserRegistration } = require("../Controller/auth.controller");

router.route("/signup").post(uploads.single("avatar"), UserRegistration);

module.exports = router;
