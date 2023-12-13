import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createNew, list, show } from "../controllers/parfume.controller.js";
import validator from "../middlewares/validator.middleware.js";
import { createRules } from "../validations/parfume.validation.js";

const parfumeRoute = express.Router();

parfumeRoute.post("/", auth, createRules, validator, createNew);
parfumeRoute.get("/", auth, list);
parfumeRoute.get("/:id", auth, show);

export default parfumeRoute
