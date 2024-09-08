import express from "express";
import {postJob,getAllJobs,getJobById,getAdminJobs } from "../controller/job.controller.js";
import isAuthenticate from "../middleware/userAuthenticate.js";

const router = express.Router();

router.route("/register").post(isAuthenticate,postJob);
router.route("/jobs").get(isAuthenticate,getAllJobs);
router.route("/:id").get(isAuthenticate,getJobById);
router.route("/admin/jobs").get(isAuthenticate,getAdminJobs);

export default router;