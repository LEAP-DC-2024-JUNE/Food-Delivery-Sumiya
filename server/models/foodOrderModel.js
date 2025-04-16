import mongoose, { model, Types } from "mongoose";
const FoodOrderStatusEnum = {
  PENDING: "PENDING",
  CANCELED: "CANCELED",
  DELIVERED: "DELIVERED",
};
const foodOrderItemSchema = new mongoose.Schema({
  food: { type: Types.ObjectId, ref: "food" },
  quantity: { type: Number, required: true },
});
const foodOrderSchema = new mongoose.Schema(
  {
    user: { type: Types.ObjectId, ref: "user" },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [foodOrderItemSchema] },
    status: { type: String, enum: Object.values(FoodOrderStatusEnum) },
  },
  { timestamps: true }
);
export const FoodOrderModel = model("foodOrder", foodOrderSchema);
