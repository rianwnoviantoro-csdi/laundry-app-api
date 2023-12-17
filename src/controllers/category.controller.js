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
    return res
      .status(200)
      .json({ message: "Success.", data: await Category.findAll() });
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
