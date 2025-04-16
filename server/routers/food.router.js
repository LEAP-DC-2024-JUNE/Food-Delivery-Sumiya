import express from "express";
import {
  getFoods,
  createFoods,
  updateFoodsById,
  deleteFoodsById,
} from "../controllers/foodController.js";
const foodRouter = express.Router();
foodRouter.get("/foods", getFoods);
foodRouter.post("/foods", createFoods);
foodRouter.patch("/foods/:id", updateFoodsById);
foodRouter.delete("/foods/:id", deleteFoodsById);
export default foodRouter;
