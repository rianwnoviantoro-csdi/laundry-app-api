import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createNew, list, show } from "../controllers/category.controller.js";
import validator from "../middlewares/validator.middleware.js";
import { createRules } from "../validations/category.validation.js";

const categoryRoute = express.Router();

categoryRoute.post("/", auth, createRules, validator, createNew);
categoryRoute.get("/", auth, list);
categoryRoute.get("/:id", auth, show);

export default categoryRoute;
