import { getFoodData } from "@/utils";
import { CategoryBadge } from "./CategoryBadge";
import { FoodCard } from "../FoodCard";
export const FoodCardContainer = async () => {
  const foods = await getFoodData("categories");
  console.log(foods);
  return (
    <div className="bg-[#404040] max-w-[1440px]">
      <div>
        <img src="/foodhome.png" alt="Food" />
      </div>
      <div className="px-[88px] py-8 flex flex-col gap-10">
        <div className="flex flex-col gap-9">
          <h1 className="text-[#FFFFFF] text-[30px]">Categories</h1>
          <CategoryBadge categories={foods} />
        </div>
        <div>
          <FoodCard foods={foods} showAddDish={false} color="white" />
        </div>
      </div>
    </div>
  );
};
