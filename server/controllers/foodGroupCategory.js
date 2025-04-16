import FoodModel from "../models/food.model.js";
import { FoodCategoryModel } from "../models/foodCategoryModel.js";
export const getGroupFoods = async (req, res) => {
  try {
    // const result = await FoodModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "foodcategories",
    //       localField: "category",
    //       foreignField: "_id",
    //       as: "categoryInfo",
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       foodName: 1,
    //       price: 1,
    //       image: 1,
    //       ingredients: 1,
    //       createdAt: 1,
    //       updatedAt: 1,
    //       categoryName: "$categoryInfo.categoryName",
    //     },
    //   },
    //   {
    //     $unwind: "$categoryName",
    //   },
    //   {
    //     $group: {
    //       _id: "$categoryName",
    //       foods: { $push: "$$ROOT" },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       categoryName: "$_id",
    //       foods: 1,
    //     },
    //   },
    //   {
    //     $project: {
    //       categoryName: "$categoryName",
    //       foodData: "$foods",
    //     },
    //   },
    // ]);
    const groupedFood = await FoodModel.aggregate([
      {
        $group: {
          _id: "$category",
          foods: { $push: "$$ROOT" },
        },
      },
    ]);
    const result = await FoodCategoryModel.populate(groupedFood, {
      path: "_id",
      select: "categoryName",
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
