import { AddDish } from "../admin/AddDish";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/lib/constants";
import { AddToCart } from "../userCart/AddToCart";
import { EditDish } from "../admin/EditDish";
type FoodCardProps = {
  foods: Category[];
  showAddDish?: boolean;
  color?: string;
};
export const FoodCard: React.FC<FoodCardProps> = ({
  foods,
  showAddDish = true,
  color = "inherit",
}) => {
  return (
    <div>
      <div>
        {foods.map((food) => {
          console.log(food);
          return (
            <div key={food.key} className="flex flex-col gap-[40px] mt-[40px]">
              <h1 className=" text-[30px]" style={{ color: color }}>
                {food.categoryName}
              </h1>
              <div className="flex flex-wrap gap-9">
                {showAddDish && <AddDish categoryId={food.index} />}
                {food.foodData.map((item) => {
                  return (
                    <Card className="w-[397px] h-[342px]" key={item._id}>
                      <CardContent>
                        <div>
                          <div className="h-[210px] mt-4 relative">
                            <img
                              src={item.image}
                              className="w-full h-full absolute"
                              alt={item.foodName}
                            />
                            <div className="absolute right-2 bottom-2">
                              {showAddDish ? "" : <AddToCart food={item} />}
                              <EditDish food={item} />
                            </div>
                          </div>
                          <div>
                            <div
                              className="flex justify-between mt-5"
                              key={item._id}
                            >
                              <p className="text-[#FD543F] text-[24px]">
                                {item.foodName}
                              </p>
                              <p className="text-[18px] font-bold">
                                ${item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
