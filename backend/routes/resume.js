import express from "express";
import analyzeResumeController from "../controllers/resume.controller.js";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.post(
  "/analyze",
  isAuthenticate,
  wrapAsync(analyzeResumeController)
);

export default router;