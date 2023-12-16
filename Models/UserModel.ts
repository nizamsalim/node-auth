import { Schema, model } from "mongoose";
import { User } from "../Interfaces/index";

const userSchema = new Schema<User>({
  name: String,
  email: { required: true, type: String },
  password: { required: true, type: String },
  phone: String,
  username: String,
});

export default model<User>("user", userSchema);
