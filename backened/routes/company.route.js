import express from "express";
import { registerCompany, getCompany, getCompanyByName, updateCompany } from "../controller/company.controller.js";
import isAuthenticate from "../middleware/userAuthenticate.js";

const router = express.Router();

router.route("/register").post(isAuthenticate,registerCompany);
router.route("/").get(isAuthenticate,getCompany);
router.route("/:name").get(isAuthenticate,getCompanyByName);
router.route("/updatecompany/:id").put(isAuthenticate,updateCompany);

export default router;