import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createNew, list, show } from "../controllers/customer.controller.js";
import validator from "../middlewares/validator.middleware.js";
import { createRules } from "../validations/customer.validation.js";

const customerRoute = express.Router();

customerRoute.post("/", auth, createRules, validator, createNew);
customerRoute.get("/", auth, list);
customerRoute.get("/:id", auth, show);

export default customerRoute
