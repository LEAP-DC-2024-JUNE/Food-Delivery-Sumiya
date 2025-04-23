import express from "express";
import {
  getFoods,
  createFoods,
  updateFoodsById,
  deleteFoodsById,
} from "../controllers/foodController.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeUser } from "../middleware/author.js";
const foodRouter = express.Router();
foodRouter.get("/foods", getFoods);
foodRouter
  .route("/foods")
  .post(authenticate, authorizeUser(["ADMIN"]), createFoods);
foodRouter
  .route("/foods/:id")
  .patch(authenticate, authorizeUser(["ADMIN"]), updateFoodsById);
foodRouter
  .route("/foods/:id")
  .delete(authenticate, authorizeUser(["ADMIN"]), deleteFoodsById);
export default foodRouter;
