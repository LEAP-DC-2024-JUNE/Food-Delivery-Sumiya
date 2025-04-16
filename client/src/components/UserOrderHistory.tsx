"use client";
import { getFoodData } from "@/utils";
import { useEffect, useState } from "react";
type FoodItem = {
  food: {
    foodName: string;
  };
  quantity: number;
};

type Order = {
  totalPrice: number;
  status: string;
  foodOrderItems: FoodItem[];
  updatedAt: string;
};
export const UserOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.log("Invalid user");
        return;
      }
      try {
        const userFoodHistory = await getFoodData(`foodorder/user/${userId}`);
        setOrders(userFoodHistory);
      } catch (err) {
        console.error("Error fetching user order history:", err);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="pr-5">
      {orders.map((order) => {
        return (
          <div>
            <div className="flex justify-between">
              <p>${order.totalPrice}</p>
              <p>{order.status}</p>
            </div>
            <div>
              {" "}
              {order.foodOrderItems.map((food) => {
                return (
                  <div className="flex justify-between">
                    {" "}
                    <p>{food.food.foodName}</p> <p>{food.quantity}</p>
                  </div>
                );
              })}{" "}
            </div>
            <div>{order.updatedAt}</div>
          </div>
        );
      })}
    </div>
  );
};
