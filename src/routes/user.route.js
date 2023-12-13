import express from "express";
import { login, myProfile, register } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import validator from "../middlewares/validator.middleware.js";
import { registerRules, loginRules } from "../validations/user.validation.js";

const userRoute = express.Router();

userRoute.post("/register", registerRules, validator, register);
userRoute.post("/login", loginRules, validator, login);
userRoute.get("/my-profile", auth, myProfile);

export default userRoute;
