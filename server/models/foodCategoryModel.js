import mongoose, { model } from "mongoose";
const foodCategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
export const FoodCategoryModel = model("foodCategory", foodCategorySchema);
