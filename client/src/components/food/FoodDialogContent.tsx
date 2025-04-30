"use client";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { CartContext } from "../userCart/CartContext";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/lib/constants";
type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type FoodDialogContentProps = {
  food: Food;
};
export const FoodDialogContent: React.FC<FoodDialogContentProps> = ({
  food,
}) => {
  const context = useContext(CartContext);
  const { toast } = useToast();
  const [itemNumber, setItemNumber] = useState(1);
  if (!context) {
    return <div>Context Provider Error</div>;
  }
  const { updateCartItems } = context;

  const handleAddToCart = () => {
    const price = food.price;
    if (isNaN(price)) return;
    const newItem: CartItem = {
      ...food,
      quantity: itemNumber,
      totalPrice: price * itemNumber,
      category: food.category,
      createdAt: food.createdAt,
      updatedAt: food.updatedAt,
      __v: food.__v,
    };
    updateCartItems((prevItems) => {
      const existingItemNumber = prevItems.findIndex(
        (item) => item._id === food._id
      );
      if (existingItemNumber !== -1) {
        const updatedItems = prevItems.map((item, index) =>
          index === existingItemNumber
            ? {
                ...item,
                quantity: item.quantity + itemNumber,
                totalPrice: (item.quantity + itemNumber) * price,
              }
            : item
        );
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
    setItemNumber(1);
    toast({
      title: "Success",
      description: `${food.foodName} added to cart!`,
    });
  };

  const handleChangeNumber = (type: string) => {
    if (type === "+" && itemNumber < 99) {
      setItemNumber((prev) => prev + 1);
    } else if (type === "-" && itemNumber > 1) {
      setItemNumber((prev) => prev - 1);
    }
  };

  const calculateTotalPrice = () => {
    const price = food.price;
    if (isNaN(price)) return 0;
    return price * itemNumber;
  };
  return (
    <div className="flex gap-6">
      <div className="h-[210px] mt-4">
        <img src="/foodimage.png" className="w-full h-full" alt="FoodImage" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-[#FD543F] text-[24px]">{food.foodName}</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div>
              <p>Total price</p>
              <p className="text-[18px] font-bold">${calculateTotalPrice()}</p>
            </div>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => handleChangeNumber("-")}
                className="text-xl w-[40px] h-[40px] rounded-full borde"
              >
                -
              </button>
              <p className="text-lg">{itemNumber}</p>
              <button
                onClick={() => handleChangeNumber("+")}
                className="text-xl w-[40px] h-[40px] rounded-full border"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <Button type="submit" onClick={handleAddToCart} className="w-full">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
