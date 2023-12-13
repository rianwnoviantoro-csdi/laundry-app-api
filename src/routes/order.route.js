import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createNew, list, show } from "../controllers/order.controller.js";
import validator from "../middlewares/validator.middleware.js";
import { createRules } from "../validations/order.validation.js";

const orderRoute = express.Router();

orderRoute.post("/", auth, createRules, validator, createNew);
orderRoute.get("/", auth, list);
orderRoute.get("/:id", show);

export default orderRoute;
