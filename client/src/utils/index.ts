import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
export interface DecodedTokenType extends JwtPayload {
  id?: string;
}
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
const getToken = (): string | null => {
  return localStorage.getItem("token");
};
const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
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
export const decodeToken = (token: string | null): DecodedTokenType | null => {
  try {
    if (!token) {
      return null;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
export const getFoodOrderData = async (url: string) => {
  const response = await axios.get(`http://localhost:3001/${url}`, {
    headers: authHeader(),
  });
  const data = response.data;
  return data;
};
