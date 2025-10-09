const asyncWrapper = require("../Middleware/asyncWrapper");
const UserModel = require("../Models/user.model");

const UserRegistration = asyncWrapper(async (req, res, next) => {
  console.log("avatar image is", req.file);
  console.log("registration data is", req.body);
  return res.status(201).end();
});

module.exports = {
  UserRegistration,
};
