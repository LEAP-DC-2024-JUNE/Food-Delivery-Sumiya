export type FoodItem = {
  _id: string;
  foodName: string;
  price: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};
export type Category = {
  _id: {
    _id: string;
    categoryName: string;
  };
  foods: FoodItem[];
};
export type CartItem = {
  _id: string;
  foodName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  [key: string]: any;
};
export type FoodOrderItem = {
  _id: string;
  food: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type UserOrder = {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  foodOrderItems: FoodOrderItem[];
  createdAt: string;
  totalPrice: number;
  status: string;
  __v: number;
};
