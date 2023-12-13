import { DataTypes, Sequelize } from "sequelize";

import sequelize from "../config/db.js";

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cashier: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  service: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  parfume: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  customer: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  weight: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sub_total: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  pay: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  finish_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payment_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  pickup_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Order;
