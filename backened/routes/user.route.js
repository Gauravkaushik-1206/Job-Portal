import express from "express";
import { login, logOut, register, updateProfile } from "../controller/user.controller.js";
import isAuthenticate from "../middleware/userAuthenticate.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logOut);
router.route("/updateprofile").post(isAuthenticate,updateProfile);

export default router;