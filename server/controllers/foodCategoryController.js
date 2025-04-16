import { FoodCategoryModel } from "../models/foodCategoryModel.js";
export const createFoodCategory = async (req, res) => {
  try {
    const foodCategory = await FoodCategoryModel.create(req.body);
    res.status(201).json({
      message: "Food category created successfully",
      foodCategory,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getCategoryFoods = async (req, res) => {
  try {
    const foodCategories = await FoodCategoryModel.find();
    res.status(200).json(foodCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateCategoryFoodById = async (req, res) => {
  try {
    const updatedCategory = await FoodCategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "FoodCategory not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteCategoryFoodById = async (req, res) => {
  try {
    const deletedCategory = await FoodCategoryModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCategory) {
      return res.status(404).json({ message: "FoodCategory not found" });
    }
    res.json({ message: "FoodCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
