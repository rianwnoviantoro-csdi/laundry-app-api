import sequelize from "../config/db.js";
import User from "./user.model.js";
import Service from "./service.model.js";
import Parfume from "./parfume.model.js";
import Customer from "./customer.model.js";
import Order from "./order.model.js";

Order.belongsTo(Service, { foreignKey: "service", as: "order_service" });
Order.belongsTo(Parfume, { foreignKey: "parfume", as: "order_parfume" });
Order.belongsTo(Customer, { foreignKey: "customer", as: "order_customer" });
Order.belongsTo(User, { foreignKey: "cashier", as: "order_cashier" });

export { sequelize, User, Service, Parfume, Customer, Order };
