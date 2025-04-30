import express from "express";
import {
  createFoodOrder,
  getFoodOrder,
  updateFoodOrderStatus,
  getFoodOrderByUserId,
} from "../controllers/foodOrderController.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeUser } from "../middleware/author.js";
const foodOrderRouter = express.Router();
foodOrderRouter
  .route("/foodorder")
  .post(authenticate, authorizeUser(["ADMIN, USER"]), createFoodOrder);
foodOrderRouter
  .route("/foodorder")
  .get(authenticate, authorizeUser(["ADMIN"]), getFoodOrder);
foodOrderRouter
  .route("/foodorder/:orderId/status")
  .patch(authenticate, authorizeUser(["ADMIN"]), updateFoodOrderStatus);
foodOrderRouter.get("/foodorder/user/:userId", getFoodOrderByUserId);
export default foodOrderRouter;
