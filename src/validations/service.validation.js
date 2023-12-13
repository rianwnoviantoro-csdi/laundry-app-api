import { body } from "express-validator";

const createRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isInt()
    .withMessage("Duration must be a integer"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isInt()
    .withMessage("Price must be a integer"),
];

export { createRules };
