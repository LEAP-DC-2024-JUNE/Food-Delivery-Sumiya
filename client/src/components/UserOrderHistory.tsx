"use client";
import { getFoodData } from "@/utils";
import { useEffect, useState } from "react";
import { decodeToken } from "@/utils";
import moment from "moment";
import { JwtPayload } from "jwt-decode";
interface DecodedTokenType extends JwtPayload {
  id?: string;
}
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
      const token = localStorage.getItem("token");
      const decodedToken = decodeToken(token) as DecodedTokenType | null;

      if (!decodedToken) {
        console.log("Invalid or missing token");
        return;
      }
      const userId = decodedToken.id;
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
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case "DELIVERED":
        return "border-green-500";
      case "PENDING":
        return "border-red-500";
      case "CANCELLED":
        return "border-gray-500";
      default:
        return "border-gray-300";
    }
  };
  return (
    <div className="pr-5">
      {orders.map((order) => {
        const formattedDate = moment(order.updatedAt).format("L");
        return (
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex justify-between">
              <p className="font-bold">${order.totalPrice}</p>
              <p
                className={`border rounded-md px-2 py-1 text-sm ${getStatusColorClass(
                  order.status
                )}`}
              >
                {order.status}
              </p>
            </div>
            <div>
              {" "}
              {order.foodOrderItems.map((food) => {
                return (
                  <div className="flex justify-between mt-[10px]">
                    {" "}
                    <p className="text-[#71717A]">{food.food.foodName}</p>{" "}
                    <p>x {food.quantity}</p>
                  </div>
                );
              })}{" "}
            </div>
            <div>{formattedDate}</div>
          </div>
        );
      })}
    </div>
  );
};
