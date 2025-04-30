import express from "express";
import { login, signup } from "../controllers/userController.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/forgotPasswordController.js";
const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
export default userRouter;
