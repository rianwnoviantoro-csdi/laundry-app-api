import jwt from "jsonwebtoken";

import { config } from "../config/env.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired." });
        } else {
          return res.status(401).json({ message: "Unauthorized." });
        }
      }

      if (decoded.exp < Date.now() / 1000) {
        return res.status(401).json({ message: "Token expired." });
      }

      req.user = {
        id: decoded.id,
        name: decoded.name,
      };

      next();
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default auth
