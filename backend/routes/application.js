import express from "express"
import wrapAsync from "../utils/wrapAsync.js"
const router=express.Router()
import isAuthenticate from '../middlewares/isAuthenticate.js'
import isRecruiter from '../middlewares/isRecruiter.js'
import { applyJob, getAllApplied,getApplicant, updateStatus } from "../controllers/application.controller.js"

router.route("/apply/:id").post(isAuthenticate,wrapAsync(applyJob))
router.route("/getAppliedJob").get(isAuthenticate,wrapAsync(getAllApplied))
router.route("/:id/applicant").get(isAuthenticate,isRecruiter,wrapAsync(getApplicant))
router.route("/status/:id/update").put(isAuthenticate,isRecruiter,wrapAsync(updateStatus))

export default router