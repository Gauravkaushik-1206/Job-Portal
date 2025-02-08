import express from "express";
import { login, logOut, register, updateProfile, validToken } from "../controller/user.controller.js";
import isAuthenticate from "../middleware/userAuthenticate.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/updateprofile").post(isAuthenticate,singleUpload,updateProfile);
router.route("/validate").get(isAuthenticate,validToken);

export default router;