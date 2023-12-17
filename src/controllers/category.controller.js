import { countRecords, fetchRecords } from "../helpers/pagination.helper.js";
import Category from "../models/category.model.js";

export const createNew = async (req, res) => {
  try {
    const { name, description = null } = req.body;

    const existCategory = await Category.findOne({ where: { name } });

    if (existCategory) {
      return res.status(409).json({ message: `Category already exist.` });
    }

    const newCategory = await Category.create({ name, description });

    return res.status(200).json({ message: "Success.", data: newCategory });
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

    const totalRecords = await countRecords(Category, condition);
    const services = await fetchRecords(Category, {
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
          ? `/category?page=${parseInt(page) + 1}`
          : null,
      prev: parseInt(page) > 1 ? `/category?page=${page - 1}` : null,
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

    const category = await Category.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ message: `Category doesn't exist.` });
    }

    return res.status(200).json({ message: "Success.", data: category });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
