import express from "express"
import wrapAsync from "../utils/wrapAsync.js"
const router=express.Router()
import isAuthenticate from '../middlewares/isAuthenticate.js'
import { applyJob, getAllApplied,getApplicant, updateStatus } from "../controllers/application.controller.js"

router.route("/apply/:id").get(isAuthenticate,wrapAsync(applyJob))
router.route("/getAppliedJob").get(isAuthenticate,wrapAsync(getAllApplied))
router.route("/:id/applicant").get(isAuthenticate,wrapAsync(getApplicant))
router.route("/status/:id/update").put(isAuthenticate,wrapAsync(updateStatus))

export default router