import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const generateJwToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, "your-jwt-secret", {
    expiresIn: "1d",
  });
};
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      ...req.body,
      password: hashedPass,
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const jwToken = generateJwToken(user._id, user.email, user.role);
    res.status(200).json({
      status: "Succes",
      message: "You are loggin in succesfully",
      token: jwToken,
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
