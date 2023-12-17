import { countRecords, fetchRecords } from "../helpers/pagination.helper.js";
import Category from "../models/category.model.js";
import Service from "../models/service.model.js";

export const createNew = async (req, res) => {
  try {
    const { name, description = null, duration, price, category } = req.body;

    const existService = await Service.findOne({ where: { name } });

    if (existService) {
      return res.status(409).json({ message: `Service already exist.` });
    }

    const newService = await Service.create({
      category,
      name,
      description,
      duration,
      price,
    });

    return res.status(200).json({ message: "Success.", data: newService });
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
      category = "",
      orderBy = "createdAt",
      order = "DESC",
      price = "",
    } = req.query;

    const condition = {};

    if (category) {
      condition.category = category;
    }

    if (price) {
      condition.price = price;
    }

    const totalRecords = await countRecords(Service, condition);

    const services = await fetchRecords(Service, {
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
          ? `/service?page=${parseInt(page) + 1}`
          : null,
      prev: parseInt(page) > 1 ? `/service?page=${page - 1}` : null,
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

    const service = await Service.findOne({
      where: { id },
      include: [
        {
          model: Category,
          as: "service_category",
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ message: `Service doesn't exist.` });
    }

    return res.status(200).json({ message: "Success.", data: service });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
