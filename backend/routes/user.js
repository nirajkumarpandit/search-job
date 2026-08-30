import express from "express"
import { register,login,logout,updateProfile } from "../controllers/user.controller.js"
import wrapAsync from "../utils/wrapAsync.js"
import isAuthenticate from "../middlewares/isAuthenticate.js"
import { singleUpload } from "../middlewares/multer.js"
const router=express.Router()

router.route('/register').post(singleUpload,wrapAsync(register))
router.route('/login').post(wrapAsync(login))
router.route('/logout').post(wrapAsync(logout))
router.route('/update').post(isAuthenticate,singleUpload,wrapAsync(updateProfile))

export default router
