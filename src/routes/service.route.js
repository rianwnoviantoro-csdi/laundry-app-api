import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createNew, list, show } from "../controllers/service.controller.js";
import validator from "../middlewares/validator.middleware.js";
import { createRules } from "../validations/service.validation.js";

const serviceRoute = express.Router();

serviceRoute.post("/", auth, createRules, validator, createNew);
serviceRoute.get("/", auth, list);
serviceRoute.get("/:id", auth, show);

export default serviceRoute;
