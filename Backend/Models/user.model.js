const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      // public_id:{
      //     type:String,
      //     required:true
      // },
      // url:{
      //     type:String,
      //     required:true
      // }
      type: String,
      required: true,
    },
    pnone:{
      type:String
    },
    addresses:[
      {
        country:String,
        city:String,
        state:String,
        address1:String,
        address2:String,
        address_type:String
      }
    ]
  },
  {
    timestamps: true,
  }
);


const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
