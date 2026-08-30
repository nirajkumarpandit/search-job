import express from "express"
import wrapAsync from "../utils/wrapAsync.js"
import { getAllCompany, getCompanyById, registeCompany, updateCompany } from "../controllers/company.controller.js"
import isAuthenticate from '../middlewares/isAuthenticate.js'
import {singleUpload} from '../middlewares/multer.js'
import isRecruiter from "../middlewares/isRecruiter.js"
const router=express.Router()

router.route('/register').post(isAuthenticate,isRecruiter,wrapAsync(registeCompany))
router.route('/get').get(isAuthenticate,isRecruiter,wrapAsync(getAllCompany))
router.route('/get/:id').get(isAuthenticate,isRecruiter,wrapAsync(getCompanyById))
router.route('/update/:id').put(isAuthenticate,isRecruiter,singleUpload,wrapAsync(updateCompany))

export default router