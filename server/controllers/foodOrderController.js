import { FoodOrderModel } from "../models/foodOrderModel.js";
import mongoose from "mongoose";
export const createFoodOrder = async (req, res) => {
  try {
    const newFoodOrder = await FoodOrderModel.create(req.body);
    res.json(newFoodOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getFoodOrder = async (req, res) => {
  try {
    const foodOrders = await FoodOrderModel.find()
      .populate("user")
      .populate("foodOrderItems.food");
    res.json(foodOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateFoodOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await FoodOrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getFoodOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userOrders = await FoodOrderModel.find({ user: userId })
      .populate("user")
      .populate("foodOrderItems.food");

    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
