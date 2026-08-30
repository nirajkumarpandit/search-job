import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cludnary.js'
import { profile } from 'console'

// register user
export const register = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, role } = req.body
        if (!username || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: "someting is missing !",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exist",
                success: false
            })
        }
        let profilePhoto = ""
        if (req.file) {
            const fileUri = getDataUri(req.file)
            const cloudResopnse = await cloudinary.uploader.upload(fileUri.content)
            profilePhoto = cloudResopnse.secure_url
        }
        // password ko hast form me convert
        const hashPassword = await bcrypt.hash(password, 10)
        // user create
        await User.create({
            username,
            email,
            password: hashPassword,
            role,
            phoneNumber,
            profile: {
                profilePhoto: profilePhoto
            }
        })
        return res.status(201).json({
            message: "user successfully created.",
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}

// user Login

export const login = async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return res.status(400).json({
            message: "something is missing",
            success: false
        })
    }
    // check pahale se user exist karta hai ya nai
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "email or password incorrect",
            success: false,
        })
    }
    // password check are same or not
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "email or password incorrect",
            success: false,
        })
    }
    if (role !== user.role) {
        return res.status(400).json({
            message: "Account doesn't exist with current role",
            success: false
        })
    }
    // if all correct then generate token
    const tokenData = {
        userId: user._id
    }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })
    user = {
        _id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profile: user.profile,
        role: user.role

    }
    return res.status(200).cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true,
        sameSite: "none"
    }).json({
        message: `Welcome back ${user.username}`,
        user,
        success: true
    })
}
// logout

export const logout = async (req, res) => {
    return res
        .status(200)
        .cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        .json({
            message: "Logged out successfully",
            success: true
        });
};

// update 
export const updateProfile = async (req, res) => {
    const { username, email, phoneNumber, skills, bio } = req.body
    const file = req.file
    let skillsArray;
    if (skills) {
        skillsArray = skills.split(",")
    }
    //find kon update kar raha hai
    const userId = req.id // isAuthenticate middleware se aayega
    let user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({
            message: "user not found",
            success: false
        })
    }
    // update the value
    if (req.file) {
        // cloudnary implement
        const fileUri = getDataUri(file)
        const cloudResopnse = await cloudinary.uploader.upload(fileUri.content);
        user.profile.resume = cloudResopnse.secure_url // save the cloudinary url
        user.profile.resumeOriginalName = file.originalname //save the original file name
    }
    if (username) user.username = username
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillsArray
    await user.save();
    const updatedUser = await User.findById(userId);

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser
    });
}