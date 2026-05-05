import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js"



// GET CURRENT USER CONTROLLER=======================================
export const getCurrentUser = async (req,res) => {
   try {
    const userId = req.userId
    const user = await User.findById(userId).populate("posts loops")
    if (!user) {
      return res.status(400).json({message:"User not found"});
    }

    return res.status(200).json(user)
   } catch (error) {
    return res.status(500).json({message:`get current user error ${error}`})
   }
}

// SUGEESTED USERS CONTROLLER ===================================
export const suggestedUser = async (req,res) => {
  try {
    const users = await User.find({
      _id:{$ne:req.userId}
    }).select("-password")
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({message:`get suggested user error ${error}`})
  }
}

// EDIT PROfILE CONTROLEER ==========================================

export const editProfile = async (req,res) => {
  try {
    
    const {name,userName,bio,profession,gender} = req.body
    const user = await User.findById(req.userId).select("-password")
    if (!user) {
      return res.status(400).json({message:"user not found"})
    }

    const sameUserWithUserName = await User.findOne({userName}).select("-password")

    if (sameUserWithUserName && sameUserWithUserName._id.toString() !==req.userId.toString()) {
      return res.status(400).json({message:"userName already exist"})
    }

    if (req.file) {
      user.profileImage=await uploadOnCloudinary(req.file.path)
    }

    user.name=name
    user.userName=userName
    user.bio=bio
    user.profession=profession
    user.gender=gender

    await user.save()
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({message:`edit profile error${error}`})
  }
}

// GET PROFILE PAGE  USER  ====================================

export const getProfile = async (req,res) => {
  try {
    const userName = req.params.userName
    const user = await User.findOne({userName}).select("-password")
    if (!user) {
      return res.status(400).json({message:"user not found"})
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:`get profile error ${error}`})
  }
}

// FOLLOW CONTROLLER ========================================