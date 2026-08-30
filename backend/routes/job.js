import express from "express"
import isAuthenticate from "../middlewares/isAuthenticate.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import wrapAsync from "../utils/wrapAsync.js";
import { deleteJob, getAdminJob, getAllJob, getJobById, postJob } from "../controllers/job.controller.js";
const router = express.Router();

router.route("/postJob").post(isAuthenticate,isRecruiter,wrapAsync(postJob))
router.route("/get").get(wrapAsync(getAllJob))
router.route("/get/:id").get(isAuthenticate,wrapAsync(getJobById))
router.route("/getAdminJobs").get(isAuthenticate,isRecruiter,wrapAsync(getAdminJob))
router.route("/delete/:id").get(isAuthenticate,isRecruiter,wrapAsync(deleteJob))


export default router