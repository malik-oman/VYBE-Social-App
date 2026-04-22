import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'





// SIGN UP CONTROLLER==============================
export const signUp = async (req,res) => {
  try {
    const {name, email, password, userName} = req.body;

    const findByEmail = await User.findOne({email})
    if (findByEmail) {
      return res.status(400).json({message:"Email Already Exist!"})
    }

        const findByUserName = await User.findOne({userName})
    if (findByUserName) {
      return res.status(400).json({message:"username Already Exist!"})
    }

    if (password.length<6) {
      return res.status(400).json({message:"Password must be at least 6 characters"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

 
    const user = await User.create({
      name,
      userName,
      email,
      password:hashedPassword,
    })

    const token = await genToken(user._id)

   res.cookie('token', token, {
    httpOnly:true,
    maxAge:10*365*24*60*60*1000,
    secure:false,
    sameSite:"Strict"
   });

   return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({message:`Signup error ${error}`})
  }
}


// SIGN IN CONTROLLER ==========================

export const signIn = async (req,res) => {
  try {
    const { password, userName} = req.body;

  

        const user = await User.findOne({userName})
    if (!user) {
      return res.status(400).json({message:"user not found!"})
    }

    const isMatch = bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({message:"Incoreect Password"})
    }
    const token = await genToken(user._id)

   res.cookie('token', token, {
    httpOnly:true,
    maxAge:10*365*24*60*60*1000,
    secure:false,
    sameSite:"Strict"
   });

   return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:`SignIn error ${error}`})
  }
}

// SIGNOUT CONTROLLER===============================

export const signOut = async (req,res) => {
  try {
   res.clearCookie('token');
   return res.status(200).json({message:"Singout successfully"})
  } catch (error) {
    return res.status(500).json({message:`signin error ${error}`})
  }
}

// SEND OTP CONTROLLER || RESET PASSWORD==================================

export const sendOtp = async (req,res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message:"User Not Found"})
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    user.resetOtp=otp,
    user.otpExpires=new Date.now() + 5*60*1000
    user.isOtpVerified=false

  } catch (error) {
    
  }
}