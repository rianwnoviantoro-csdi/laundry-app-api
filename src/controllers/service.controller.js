import Service from "../models/service.model.js";

export const createNew = async (req, res) => {
  try {
    const { name, description = null, duration, price } = req.body;

    const existService = await Service.findOne({ where: { name } });

    if (existService) {
      return res.status(409).json({ message: `Service already exist.` });
    }

    const newService = await Service.create({
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
    return res
      .status(200)
      .json({ message: "Success.", data: await Service.findAll() });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findOne({ where: { id } });

    if (!service) {
      return res.status(404).json({ message: `Service doesn't exist.` });
    }

    return res.status(200).json({ message: "Success.", data: service });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
