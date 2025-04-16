import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartContext } from "./CartContext";
import { foodOrder } from "@/utils";
import { useContext } from "react";
import { CartItem } from "@/lib/constants";
import { UserOrderHistory } from "./UserOrderHistory";
export const UserTab = () => {
  const { cartItems, updateCartItems } = useContext(CartContext) as {
    cartItems: CartItem[];
    updateCartItems: (items: CartItem[]) => void;
  };
  const handlePlus = (itemId: string) => {
    const updatedItems = cartItems.map((item) =>
      item._id === itemId && item.quantity < 99
        ? {
            ...item,
            quantity: item.quantity + 1,
            totalPrice:
              typeof item.price === "string"
                ? parseFloat(item.price) * (item.quantity + 1)
                : item.price * (item.quantity + 1),
          }
        : item
    );
    updateCartItems(updatedItems);
  };
  const handleMinus = (itemId: string) => {
    const updatedItems = cartItems.map((item) =>
      item._id === itemId && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
            totalPrice:
              typeof item.price === "string"
                ? parseFloat(item.price) * (item.quantity - 1)
                : item.price * (item.quantity - 1),
          }
        : item
    );
    updateCartItems(updatedItems);
  };
  const handleRemoveItem = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== itemId);
    updateCartItems(updatedItems);
  };

  const handleCheckout = async () => {
    if (typeof window !== "undefined") {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in local storage.");
          return;
        }
        const totalPrice = cartItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        const foodOrderItems = cartItems.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        }));
        const orderData = {
          user: userId,
          totalPrice: totalPrice,
          foodOrderItems: foodOrderItems,
          status: "PENDING",
        };
        const response = await foodOrder(orderData);
        localStorage.clear();
        updateCartItems([]);
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  };
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };
  return (
    <div>
      <Tabs defaultValue="cart" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="order">Order</TabsTrigger>
        </TabsList>
        <TabsContent value="cart" className="pr-5">
          <Card>
            <CardHeader>
              <CardTitle>My Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-2xl flex flex-col gap-2 px-5 py-4">
                {cartItems.map((item) => {
                  return (
                    <div className="flex gap-[10px]">
                      <div className="w-[124px] h-[120px]">
                        <img
                          src={item.image}
                          className="w-full h-full"
                          alt={item.foodName}
                        />
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex justify-between items-center">
                          <div className="text-red-500">{item.foodName} </div>
                          <div>
                            <button
                              onClick={() => handleRemoveItem(item._id)}
                              className="text-red-400 border border-red-400 w-[36px] h-[36px] rounded-full"
                            >
                              X
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between py-5">
                          <div className="flex gap-3 items-center">
                            <button
                              className="text-xl "
                              onClick={() => handleMinus(item._id)}
                            >
                              -
                            </button>
                            <p>{item.quantity}</p>
                            <button
                              className="text-xl "
                              onClick={() => handlePlus(item._id)}
                            >
                              +
                            </button>
                          </div>
                          <p className="font-bold">
                            $
                            {typeof item.totalPrice === "number"
                              ? Math.round(item.totalPrice)
                              : typeof item.price === "string"
                              ? Math.round(
                                  parseFloat(item.price) * item.quantity
                                )
                              : 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-5 bg-white mt-5 px-4 py-4 rounded-2xl">
                <h1 className="font-bold">Payment info</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p>Items</p>
                    <p>${calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>0.99$</p>
                  </div>
                </div>
                <div className="border-dotted border-2"></div>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>${(calculateTotal() + 0.99).toFixed(2)}</p>
                </div>
                <Button
                  type="submit"
                  onClick={handleCheckout}
                  className="w-full bg-red-500 text-white border border-red-500 rounded-full mt-5"
                >
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="order">
          <Card>
            <CardHeader>
              <CardTitle>Order history</CardTitle>
            </CardHeader>
            <CardContent>
              <UserOrderHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
