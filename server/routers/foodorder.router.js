import express from "express";
import {
  createFoodOrder,
  getFoodOrder,
  updateFoodOrderStatus,
  getFoodOrderByUserId,
} from "../controllers/foodOrderController.js";
const foodOrderRouter = express.Router();
foodOrderRouter.post("/foodorder", createFoodOrder);
foodOrderRouter.get("/foodorder", getFoodOrder);
foodOrderRouter.patch("/foodorder/:orderId/status", updateFoodOrderStatus);
foodOrderRouter.get("/foodorder/user/:userId", getFoodOrderByUserId);
export default foodOrderRouter;
