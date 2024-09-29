import express from "express";
import isAuthenticate from "../middleware/userAuthenticate.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticate,applyJob);
router.route("/get").get(isAuthenticate,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticate,getApplicants);
router.route("/status/:id/update").post(isAuthenticate,updateStatus);

export default router;