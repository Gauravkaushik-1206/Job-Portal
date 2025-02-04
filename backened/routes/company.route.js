import express from "express";
import { registerCompany, getCompany, getCompanyById, updateCompany } from "../controller/company.controller.js";
import isAuthenticate from "../middleware/userAuthenticate.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticate,registerCompany);
router.route("/").get(isAuthenticate,getCompany);
router.route("/:id").get(isAuthenticate,getCompanyById);
router.route("/updatecompany/:id").put(isAuthenticate,singleUpload,updateCompany);

export default router;