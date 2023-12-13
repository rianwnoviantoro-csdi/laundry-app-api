import Parfume from "../models/parfume.model.js";

export const createNew = async (req, res) => {
  try {
    const { name, description = null } = req.body;

    const existParfume = await Parfume.findOne({ where: { name } });

    if (existParfume) {
      return res.status(409).json({ message: `Parfume already exist.` });
    }

    const newParfume = await Parfume.create({ name, description });

    return res.status(200).json({ message: "Success.", data: newParfume });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const list = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Success.", data: await Parfume.findAll() });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;

    const parfume = await Parfume.findOne({ where: { id } });

    if (!parfume) {
      return res.status(404).json({ message: `Parfume doesn't exist.` });
    }

    return res.status(200).json({ message: "Success.", data: parfume });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
