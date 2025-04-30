import { AddCategory } from "@/components/admin/AddCategory";
import { getFoodData } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { FoodCard } from "@/components/food/FoodCard";
type CategoryData = {
  _id: {
    _id: string;
    categoryName: string;
  };
  foods: FoodItem[];
};
type FoodItem = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
const Category = async () => {
  const categories: CategoryData[] = await getFoodData("categories");
  return (
    <div className="max-w-[1440px]">
      <div className="flex flex-col gap-4 px-6 py-6">
        <h1 className="font-bold">Dishes category</h1>
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">All dishes</Badge>
            {categories.map((category, index) => {
              return (
                <Badge variant="outline" key={category.index}>
                  {category.categoryName}
                  <span className="bg-black text-white w-6 ml-2 flex items-center justify-center rounded-2xl">
                    {category.foodData.length}
                  </span>
                </Badge>
              );
            })}
          </div>
          <AddCategory />
        </div>
      </div>
      <div className="px-5 py-5">
        <FoodCard foods={categories} />
      </div>
    </div>
  );
};
export default Category;
