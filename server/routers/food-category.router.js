import express from "express";
import {
  getCategoryFoods,
  createFoodCategory,
  updateCategoryFoodById,
  deleteCategoryFoodById,
} from "../controllers/foodCategoryController.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeUser } from "../middleware/author.js";
const foodCategoryRouter = express.Router();
foodCategoryRouter.get("/food-categories", getCategoryFoods);
foodCategoryRouter
  .route("/food-categories")
  .post(authenticate, authorizeUser(["ADMIN"]), createFoodCategory);
foodCategoryRouter.patch("/food-categories/:id", updateCategoryFoodById);
foodCategoryRouter.delete("/food-categories/:id", deleteCategoryFoodById);
export default foodCategoryRouter;
