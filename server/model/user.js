import { Schema, model } from "mongoose";
const UserSchema = new Schema({
  name: { type: String },
  age: { type: Number },
});
export const UserModel = model("user", UserSchema);
