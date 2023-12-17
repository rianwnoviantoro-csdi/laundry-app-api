import express from "express";

import userRoute from "./user.route.js";
import parfumeRoute from "./parfume.route.js";
import serviceRoute from "./service.route.js";
import customerRoute from "./customer.route.js";
import orderRoute from "./order.route.js";
import categoryRoute from "./category.route.js";

const router = express();

router.use("/api/v1/user", userRoute);
router.use("/api/v1/parfume", parfumeRoute);
router.use("/api/v1/service", serviceRoute);
router.use("/api/v1/customer", customerRoute);
router.use("/api/v1/category", categoryRoute);
router.use("/api/v1/order", orderRoute);

export default router;
