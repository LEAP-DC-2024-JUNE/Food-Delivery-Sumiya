import FoodModel from "../models/food.model.js";
import { FoodCategoryModel } from "../models/foodCategoryModel.js";

export const getGroupFoods = async (req, res) => {
  try {
    const allCategories = await FoodCategoryModel.find(
      {},
      { _id: 1, categoryName: 1 }
    );

    const groupedFood = await FoodModel.aggregate([
      {
        $group: {
          _id: "$category",
          foods: { $push: "$$ROOT" },
        },
      },
    ]);

    const populatedGroupedFood = await FoodCategoryModel.populate(groupedFood, {
      path: "_id",
      select: "categoryName",
    });

    const result = allCategories.map((category) => {
      const categoryData = populatedGroupedFood.find((item) =>
        item._id._id.equals(category._id)
      );

      return {
        categoryName: category.categoryName,
        foodData: categoryData ? categoryData.foods : [],
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
