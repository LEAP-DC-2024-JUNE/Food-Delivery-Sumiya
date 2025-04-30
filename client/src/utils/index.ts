import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
export interface DecodedTokenType extends JwtPayload {
  id?: string;
  role?: string;
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
type ForgotPasswordData = {
  email: string;
};

type ResetPasswordData = {
  password: string;
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
    const response = await axios.post(`http://localhost:3001/foodorder`, data, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    throw error || { message: "Something went wrong" };
  }
};
export const updateOrder = async (data: UpdateOrderData) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/foodorder/${data.orderId}/status`,
      { status: data.status },
      {
        headers: authHeader(),
      }
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
export const forgotPassword = async (data: ForgotPasswordData) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/forgot-password`,
      data
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Failed to send reset link" };
  }
};

export const resetPassword = async (
  token: string | undefined,
  data: ResetPasswordData
) => {
  try {
    if (!token) {
      throw { message: "Invalid reset link" };
    }
    const response = await axios.post(
      `http://localhost:3001/reset-password/${token}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Failed to reset password" };
  }
};
export const getFoodOrderData = async (url: string, dateRange?: DateRange) => {
  let apiUrl = `http://localhost:3001/${url}`;

  if (dateRange?.from && dateRange?.to) {
    const fromDate = format(dateRange.from, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    const toDate = format(dateRange.to, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    apiUrl += `?fromDate=${fromDate}&toDate=${toDate}`;
  }

  const response = await axios.get(apiUrl, {
    headers: authHeader(),
  });
  const data = response.data;
  return data;
};
