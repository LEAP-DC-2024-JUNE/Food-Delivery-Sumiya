import mongoose, { model, Types } from "mongoose";
const foodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    ingredients: { type: String },
    category: { type: Types.ObjectId, ref: "FoodCategory" },
  },
  { timestamps: true }
);
export default model("food", foodSchema);
