import FoodModel from "../models/food.model.js";
export const createFoods = async (req, res) => {
  try {
    const newFood = await FoodModel.create(req.body);
    res.json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateFoodsById = async (req, res) => {
  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(updatedFood);
  } catch {
    res.status(400).json({ message: error.message });
  }
};
export const deleteFoodsById = async (req, res) => {
  try {
    const deletedFood = await FoodModel.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json({ message: "Food deleted successfully" });
  } catch {
    res.status(500).json({ message: error.message });
  }
};
