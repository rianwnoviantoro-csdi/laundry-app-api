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

    const refreshToken = jwt.sign(tokenPayload, config.REFRESH, {
      expiresIn: config.REFRESH_EXP,
    });

    res.cookie("jwt", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 10 * 60 * 1000,
    });

    return res.status(200).json({ message: "Success.", data: { token } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const refresh = async (req, res) => {
  try {
    const { jwt: token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const decoded = jwt.verify(token, config.REFRESH);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const existUser = await User.findOne({ where: { id: decoded.id } });

    if (!decoded) {
      return res.status(404).json({ message: "User not found." });
    }

    const payload = {
      id: existUser.id,
      name: existUser.name,
    };

    const accessToken = jwt.sign(payload, config.SECRET, {
      expiresIn: config.EXP,
    });

    return res
      .status(200)
      .json({ message: "Success.", data: { token: accessToken } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    return res.status(200).json({ message: "Success.", data: [] });
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
