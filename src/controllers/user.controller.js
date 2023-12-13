import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { config } from "../config/env.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
      return res.status(409).json({ message: `Email already exist.` });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });

    const user = await User.findOne({
      where: { id: newUser.id },
      attributes: [
        "id",
        "name",
        "email",
        "is_active",
        "created_at",
        "updated_at",
      ],
    });

    return res.status(200).json({ message: "Success.", data: user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ where: { email } });

    if (!existUser) {
      return res.status(400).json({ message: `Bad credentials.` });
    }

    const matchPassword = await bcrypt.compare(password, existUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: `Bad credentials.` });
    }

    const tokenPayload = {
      id: existUser.id,
      name: existUser.name,
    };

    const token = jwt.sign(tokenPayload, config.SECRET, {
      expiresIn: config.EXP,
    });

    return res.status(200).json({ message: "Success.", data: { token } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const myProfile = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Success.",
      data: await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
      }),
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
