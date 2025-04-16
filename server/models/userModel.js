import { Schema, model, Types } from "mongoose";
const UserRoleEnum = {
  USER: "USER",
  ADMIN: "ADMIN",
};
const UserSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, enum: Object.values(UserRoleEnum), required: true },
    orderedFoods: [{ type: Types.ObjectId, ref: "FoodOrder" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = model("user", UserSchema);
