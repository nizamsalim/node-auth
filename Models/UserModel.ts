import { Schema, model } from "mongoose";
import IUser from "../Interfaces/User";

const userSchema = new Schema<IUser>({
  name: String,
  field: { required: true, type: String },
  password: { required: true, type: String },
  phone: String,
});

export default model<IUser>("user", userSchema);
