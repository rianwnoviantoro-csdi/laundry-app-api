import * as randomstring from "randomstring";

import Order from "../models/order.model.js";
import Service from "../models/service.model.js";
import Customer from "../models/customer.model.js";
import Parfume from "../models/parfume.model.js";
import User from "../models/user.model.js";
import { countRecords, fetchRecords } from "../helpers/pagination.helper.js";

export const createNew = async (req, res) => {
  try {
    const {
      service,
      parfume,
      customer,
      weight,
      discount = 0,
      status,
      payment_at = null,
      pickup_at = null,
    } = req.body;

    const dateNow = new Date();

    const number = generateInvoiceCode(
      randomstring.generate(6).toUpperCase(),
      dateNow,
      await Order.count()
    );

    const serviceData = await Service.findOne({ where: { id: service } });

    const finish = new Date(dateNow);

    finish.setDate(dateNow.getDate() + serviceData.duration);

    const newOrder = await Order.create({
      number: number,
      cashier: req.user.id,
      service,
      parfume,
      customer,
      weight,
      discount,
      status,
      sub_total: Math.floor(weight * serviceData.price),
      pay: Math.floor(
        weight * serviceData.price -
          (weight * serviceData.price * discount) / 100
      ),
      finish_at: finish.toISOString(),
      payment_at,
      pickup_at,
    });

    const order = await Order.findOne({
      where: { id: newOrder.id },
      include: [
        {
          model: Service,
          as: "order_service",
          attributes: ["id", "name", "description", "duration", "price"],
        },
        {
          model: Parfume,
          as: "order_parfume",
          attributes: ["id", "name", "description"],
        },
        {
          model: Customer,
          as: "order_customer",
          attributes: ["id", "name", "phone"],
        },
        { model: User, as: "order_cashier", attributes: ["id", "name"] },
      ],
      attributes: [
        "id",
        "number",
        "weight",
        "discount",
        "sub_total",
        "pay",
        "status",
        "finish_at",
        "payment_at",
        "pickup_at",
        "created_at",
        "updated_at",
      ],
    });

    return res.status(200).json({
      message: "Success.",
      data: order,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const list = async (req, res) => {
  try {
    const {
      pageSize = 10,
      page = 1,
      orderBy = "createdAt",
      order = "DESC",
    } = req.query;

    const condition = {};

    const totalRecords = await countRecords(Order, condition);
    const services = await fetchRecords(Order, {
      condition,
      orderBy,
      order,
      pageSize,
      page,
    });

    const totalPages = Math.ceil(totalRecords / pageSize);

    const meta = {
      totalRecords,
      totalPages,
      page: parseInt(page),
    };

    const links = {
      next:
        parseInt(page) < totalPages
          ? `/order?page=${parseInt(page) + 1}`
          : null,
      prev: parseInt(page) > 1 ? `/order?page=${page - 1}` : null,
    };

    return res.status(200).json({
      message: "Success.",
      data: {
        services,
        meta,
        links,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: Service,
          as: "order_service",
          attributes: ["id", "name", "description", "duration", "price"],
        },
        {
          model: Parfume,
          as: "order_parfume",
          attributes: ["id", "name", "description"],
        },
        {
          model: Customer,
          as: "order_customer",
          attributes: ["id", "name", "phone"],
        },
        { model: User, as: "order_cashier", attributes: ["id", "name"] },
      ],
      attributes: [
        "id",
        "number",
        "weight",
        "discount",
        "sub_total",
        "pay",
        "status",
        "finish_at",
        "payment_at",
        "pickup_at",
        "created_at",
        "updated_at",
      ],
    });

    if (!order) {
      return res.status(404).json({ message: `Order doesn't exist.` });
    }

    return res.status(200).json({ message: "Success.", data: order });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const generateInvoiceCode = (prefix, date, sequentialNumber) => {
  const formattedDate = date.toISOString().slice(2, 10).replace(/-/g, "");
  const formattedSequentialNumber = String(sequentialNumber).padStart(4, "0");

  return `${prefix}.${formattedDate}.${formattedSequentialNumber}`;
};
