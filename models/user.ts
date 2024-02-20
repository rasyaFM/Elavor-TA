import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    role: { type: String, required: false },
    request: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<IUserModel>("User", userSchema);

export default User;
