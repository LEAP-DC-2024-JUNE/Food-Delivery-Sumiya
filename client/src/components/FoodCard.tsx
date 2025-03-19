"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardType } from "@/app/home/page";
type CardPropsType = {
  food: CardType;
  showMenu: boolean;
  toggleMenu: () => void;
  key: string;
};
export const FoodCard = ({
  food,
  showMenu,
  toggleMenu,
  key,
}: CardPropsType) => {
  return (
    <div className="relative">
      <Card className="w-[400px] h-auto">
        <CardHeader className="relative">
          <img src={food.img} className="h-[210px]"></img>
          <button
            className="absolute text-red-600 w-[44px] h-[44px] rounded-full bg-white text-xl"
            onClick={toggleMenu}
          >
            +
          </button>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p className="text-red-700 text-2xl">{food.title}</p>
          <p className="font-bold text-2xl">${food.price}</p>
        </CardContent>
        <CardFooter>
          <p>{food.description}</p>
        </CardFooter>
      </Card>
      {showMenu && (
        <div key={key} className="w-[826px] h-[412px] absolute flex">
          <div className="flex-1">
            <img src={food.img}></img>
          </div>
          <div className="flex-1">
            <div>
              <p>{food.title}</p>
              <p>{food.description}</p>
            </div>
            <div>
              <div>
                <div>
                  <p>Total Price</p>
                  <p>${food.price}</p>
                </div>
                <div>1</div>
              </div>
              <button></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FoodCard;
