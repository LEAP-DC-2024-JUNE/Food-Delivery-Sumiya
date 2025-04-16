"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import { CartItem } from "@/lib/constants";
type CartContextProps = {
  cartItems: CartItem[];
  updateCartItems: (
    newItems: CartItem[] | ((prevItems: CartItem[]) => CartItem[])
  ) => void;
};
export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCartItems = localStorage.getItem("cartItems");
        return storedCartItems ? JSON.parse(storedCartItems) : [];
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    }
  }, [cartItems]);

  const updateCartItems = useCallback(
    (newItems: CartItem[] | ((prevItems: CartItem[]) => CartItem[])) => {
      if (typeof newItems === "function") {
        setCartItems((prevItems) => newItems(prevItems));
      } else {
        setCartItems(newItems);
      }
    },
    []
  );
  const value = {
    cartItems,
    updateCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
