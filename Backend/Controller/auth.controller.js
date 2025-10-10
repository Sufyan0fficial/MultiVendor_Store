const asyncWrapper = require("../Middleware/asyncWrapper");
const UserModel = require("../Models/user.model");
const customError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const bcrypt = require('bcryptjs')

const UserRegistration = asyncWrapper(async (req, res, next) => {
  const { email, password, name } = req.body;

  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    return next(customError(400, "User Already Exist"));
  }
  const fileName = req.file.filename;
  const user = {
    name,
    email,
    password,
    avatar: fileName,
  };

  const access_token = jwt.sign(user,process.env.JWT_SECRETS,{expiresIn:'2m'})
  console.log('access token is',access_token)
 
  const activationLink = `${process.env.FE_URL}/activation/${access_token}`;
  res.status(200).json({
    success: true,
    message: `Please check your email ${email} to activate your account`,
  });

  await sendMail({
    to: email,
    subject: "Activate your account",
    text: `Hello ${name}, Please click on the link below to activate your account: ${activationLink}`,
  });

  
});

const ActivateUser = asyncWrapper(async(req,res,next)=>{
  const {activationString} = req.body
  if(activationString){
    let user = jwt.verify(activationString,process.env.JWT_SECRETS)
    const {iat,exp,password,...rest} = user
    const hashedPassword = bcrypt.hashSync(password,10)
    await UserModel.create({...rest,password:hashedPassword})
    return res.status(201).json({
      success:true,
      message:'Account created Successfully'
    })
  }
  else {
    return next(customError(404,'Activation Token not found'))
  }
})

const UserLogin = asyncWrapper(async(req,res,next)=>{
    const {email, password} = req.body
    const isUserExist = await UserModel.findOne({email})
    if(!isUserExist){
      return next(customError(404,'User does not exist'))
    }
    const passwordVerification = bcrypt.compareSync(password,isUserExist?.password)
    console.log('password verification is',passwordVerification)
    if(!passwordVerification){
      return next(customError(404,'Invalid Credentials, Please check your password'))
    }
    const {password:pss, ...rest} = isUserExist?._doc
    const access_token = jwt.sign({id:isUserExist?._id},process.env.JWT_SECRETS,{expiresIn:'7d'})
      return res.cookie('access_token',access_token,{httpOnly:true,maxAge: 7 * 24 * 60 * 60 * 1000,}).status(200).json({
        success:true,
        messsage:'User login successfully',
        data: rest
      })

})

module.exports = {
  UserRegistration,
  ActivateUser,
  UserLogin
};
