import express from "express";
import {
  getCategoryFoods,
  createFoodCategory,
  updateCategoryFoodById,
  deleteCategoryFoodById,
} from "../controllers/foodCategoryController.js";
const foodCategoryRouter = express.Router();
foodCategoryRouter.get("/food-categories", getCategoryFoods);
foodCategoryRouter.post("/food-categories", createFoodCategory);
foodCategoryRouter.patch("/food-categories/:id", updateCategoryFoodById);
foodCategoryRouter.delete("/food-categories/:id", deleteCategoryFoodById);
export default foodCategoryRouter;
