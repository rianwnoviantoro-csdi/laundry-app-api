import { countRecords, fetchRecords } from "../helpers/pagination.helper.js";
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
    const {
        pageSize = 10,
        page = 1,
        orderBy = "createdAt",
        order = "DESC",
      } = req.query;

      const condition = {};

      const totalRecords = await countRecords(Parfume, condition);
      const services = await fetchRecords(Parfume, {
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
            ? `/parfume?page=${parseInt(page) + 1}`
            : null,
        prev: parseInt(page) > 1 ? `/parfume?page=${page - 1}` : null,
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
