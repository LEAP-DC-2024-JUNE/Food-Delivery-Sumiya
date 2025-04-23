import jwt from "jsonwebtoken";
import { findUserById } from "../models/userQueries.js";
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.decode(token);
      const foundUser = await findUserById(decoded.id);
      req.body.user = foundUser;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid token" });
    }
  } else {
    return res.status(401).json({
      message: "Authentication failed: Missing or invalid token format",
    });
  }
};
