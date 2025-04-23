import { UserModel } from "./userModel.js";
export const findUserById = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return null;
  }
};
