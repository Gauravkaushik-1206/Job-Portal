import express from "express";
import { login, logOut, register, updateProfile } from "../controller/user.controller";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logOut").post(logOut);
router.route("/updateProfile").post(updateProfile);