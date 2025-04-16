import axios from "axios";
type SignupData = {
  email: string;
  password: string;
  role: string;
};
type LoginData = {
  email: string;
  password: string;
};
type FoodOrderData = {
  user: string;
  totalPrice: number;
  foodOrderItems: { food: string; quantity: number }[];
  status: string;
};
type UpdateOrderData = {
  orderId: string;
  status: string;
};
export const getFoodData = async (url: string) => {
  const response = await axios.get(`http://localhost:3001/${url}`);
  const data = response.data;
  return data;
};
export const signup = async (data: SignupData) => {
  const response = await axios.post(`http://localhost:3001/signup`, data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await axios.post(`http://localhost:3001/login`, data);
  return response.data;
};
export const foodOrder = async (data: FoodOrderData) => {
  try {
    const response = await axios.post(`http://localhost:3001/foodorder`, data);
    return response;
  } catch (error) {
    throw error || { message: "Something went wrong" };
  }
};
export const updateOrder = async (data: UpdateOrderData) => {
  console.log("URL:", `http://localhost:3001/foodorder/${data.orderId}/status`);
  try {
    const response = await axios.patch(
      `http://localhost:3001/foodorder/${data.orderId}/status`,
      { status: data.status }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};
